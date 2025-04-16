import sys
import json
from datetime import datetime, timezone
import instaloader

def analyze_profile(username):
    L = instaloader.Instaloader()
    
    try:
        # Get profile
        profile = instaloader.Profile.from_username(L.context, username)
        
        # Risk analysis
        risk_factors = []
        is_fake = False
        
        # Account age check
        if profile.biography == "":
            risk_factors.append("No biography")
            is_fake = True
            
        # Follower/Following ratio
        if profile.followers < 10 and profile.followees > 100:
            risk_factors.append("Suspicious follower-to-following ratio")
            is_fake = True
            
        # Profile picture check
        if not profile.has_profile_pic:
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
                "isPrivate": profile.is_private,
                "followersCount": profile.followers,
                "followingCount": profile.followees,
                "postsCount": profile.mediacount,
            }
        }
        
        print(json.dumps(result))
        
    except Exception as e:
        error_result = {
            "error": str(e),
            "status": "error"
        }
        print(json.dumps(error_result))
        sys.exit(1)

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print(json.dumps({"error": "Username argument is required"}))
        sys.exit(1)
        
    analyze_profile(sys.argv[1])