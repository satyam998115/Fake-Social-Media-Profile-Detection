from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
import pandas as pd
import joblib

# Load the dataset
try:
    data = pd.read_csv('instagram_profiles.csv')
    print("Dataset loaded successfully.")
except FileNotFoundError:
    print("Error: instagram_profiles.csv not found. Please create it.")
    exit()


# Define features (X) and labels (y)
features = ['followers_count', 'following_count', 'posts_count', 'biography_length', 'has_profile_pic']
X = data[features]
y = data['label']

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create and train the model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
print("Model training complete.")

# Make predictions and evaluate the model
predictions = model.predict(X_test)
print(f"Model Accuracy: {accuracy_score(y_test, predictions):.2f}")

# Save the trained model to a file
joblib.dump(model, 'fake_profile_model.pkl')
print("Model trained and saved to fake_profile_model.pkl")
