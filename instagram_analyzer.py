import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import instaloader
import joblib
import google.generativeai as genai
from dotenv import load_dotenv

# --- MODIFICATION ---
# Explicitly find and load the .env file from the script's directory
# This makes the script more robust and independent of the working directory.
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
if os.path.exists(dotenv_path):
    load_dotenv(dotenv_path)

app = Flask(__name__)
CORS(app)

# --- Load Models and Configure APIs ---
try:
    model = joblib.load('fake_profile_model.pkl')
except FileNotFoundError:
    print("Error: fake_profile_model.pkl not found. Please run train_model.py first.")
    exit()

try:
    GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
    if not GOOGLE_API_KEY:
        raise ValueError("GOOGLE_API_KEY not found in .env file.")
    genai.configure(api_key=GOOGLE_API_KEY)
    print("Gemini API configured successfully.") # Added for confirmation
except Exception as e:
    print(f"Error configuring Gemini API: {e}")
    exit()

# --- Instaloader Setup ---
L = instaloader.Instaloader()
INSTAGRAM_USERNAME = os.getenv('INSTAGRAM_USERNAME')
INSTAGRAM_PASSWORD = os.getenv('INSTAGRAM_PASSWORD')

try:
    if not INSTAGRAM_USERNAME or not INSTAGRAM_PASSWORD:
        raise ValueError("INSTAGRAM_USERNAME and INSTAGRAM_PASSWORD not found in .env file.")
    print("Attempting to log in to Instagram...")
    L.login(INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD)
    print("Instagram login successful.")
except Exception as e:
    print(f"Error logging into Instagram: {e}")
    print("The script will continue without being logged in, but may be rate-limited.")


def get_ai_summary(profile):
    """
    Generates a qualitative summary of the profile using the Gemini API.
    """
    try:
        # --- MODIFICATION ---
        # Updated the model name to a current, valid one.
        gemini_model = genai.GenerativeModel('gemini-1.5-flash-latest')
        prompt = f"""
        Analyze the following Instagram profile data. Provide a brief, neutral, one-paragraph summary from the perspective of a social media analyst.
        Focus only on the provided data points. Do not state whether the account is 'fake' or 'real' Along with this tell me which type of the account it is, like personal professional. And also search about this person who is this and tell me

        **Profile Data:**
        - Username: {profile.username}
        - Followers: {profile.followers}
        - Following: {profile.followees}
        - Posts: {profile.mediacount}
        - Biography: "{profile.biography if profile.biography else 'Not provided'}"
        - Is Private: {'Yes' if profile.is_private else 'No'}
        - Is Verified: {'Yes' if profile.is_verified else 'No'}

        Your one-paragraph analysis:
        """
        response = gemini_model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        error_message = f"AI analysis failed: {str(e)}"
        print(f"Could not get AI summary: {e}")
        return error_message


def analyze_profile(username):
    try:
        profile = instaloader.Profile.from_username(L.context, username)

        # 1. ML Model Prediction
        features = [
            profile.followers,
            profile.followees,
            profile.mediacount,
            len(profile.biography),
            1 if profile.profile_pic_url else 0
        ]
        prediction = model.predict([features])[0]
        confidence = model.predict_proba([features])[0]
        status = "fake" if prediction == 1 else "real"
        confidence_score = confidence[prediction] * 100

        # 2. Generative AI Summary from Gemini
        ai_summary = get_ai_summary(profile)

        # 3. Rule-based Risk Factors
        risk_factors = []
        if profile.biography == "":
            risk_factors.append("No biography")
        if profile.followers < 10 and profile.followees > 100:
            risk_factors.append("Suspicious follower-to-following ratio")
        if not profile.profile_pic_url:
            risk_factors.append("No profile picture")
        if profile.mediacount < 3:
            risk_factors.append("Very few posts")

        # 4. Compile Final Result
        result = {
            "status": status,
            "confidence": round(confidence_score, 2),
            "aiView": ai_summary,
            "riskFactors": risk_factors,
            "platformType": "instagram",
            "profileData": {
                "username": profile.username, "fullName": profile.full_name,
                "biography": profile.biography, "isPrivate": profile.is_private,
                "isVerified": profile.is_verified, "followersCount": profile.followers,
                "followingCount": profile.followees, "postsCount": profile.mediacount,
                "externalUrl": profile.external_url, "profilePicUrl": str(profile.profile_pic_url),
                "isBusinessAccount": profile.is_business_account,
                "businessCategory": profile.business_category_name
            }
        }
        return result
    except instaloader.exceptions.ProfileNotFound:
        return {"error": f"Profile '{username}' not found. This can happen if the profile is private, does not exist, or if Instagram is blocking requests.", "status": "error"}
    except Exception as e:
        return {"error": str(e), "status": "error"}

@app.route("/analyze", methods=["POST"])
def analyze():
    data = request.json
    username = data.get("username")
    if not username:
        return jsonify({"error": "Username is required"}), 400
    result = analyze_profile(username)
    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True, port=5000)