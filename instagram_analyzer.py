from flask import Flask, request, jsonify
from flask_cors import CORS
import instaloader

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from React

def analyze_profile(username):
    L = instaloader.Instaloader()
    
    try:
        # Get profile
        profile = instaloader.Profile.from_username(L.context, username)
        
        # Risk analysis
        risk_factors = []
        is_fake = False
        
        # Biography check
        if profile.biography == "":
            risk_factors.append("No biography")
            is_fake = True
            
        # Follower/Following ratio
        if profile.followers < 10 and profile.followees > 100:
            risk_factors.append("Suspicious follower-to-following ratio")
            is_fake = True
            
        # Profile picture check (using profile_pic_url instead of has_profile_pic)
        if not profile.profile_pic_url:
            risk_factors.append("No profile picture")
            is_fake = True
            
        # Post analysis
        if profile.mediacount < 3:
            risk_factors.append("Very few posts")
            is_fake = True
            
        # Calculate confidence
        confidence = 95 - (len(risk_factors) * 5)
        confidence = max(0, min(100, confidence))
        
        result = {
            "status": "fake" if is_fake else "real",
            "confidence": confidence,
            "riskFactors": risk_factors,
            "platformType": "instagram",
            "profileData": {
                "username": profile.username,
                "fullName": profile.full_name,
                "biography": profile.biography,
                "isPrivate": profile.is_private,
                "isVerified": profile.is_verified,
                "followersCount": profile.followers,
                "followingCount": profile.followees,
                "postsCount": profile.mediacount,
                "externalUrl": profile.external_url,
                "profilePicUrl": str(profile.profile_pic_url),
                "isBusinessAccount": profile.is_business_account,
                "businessCategory": profile.business_category_name
            }
        }
        
        return result
        
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