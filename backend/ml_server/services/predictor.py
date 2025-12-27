import joblib
import pandas as pd
from services.decision_path import extract_decision_path
from services.recommendations import agronomist_recommendation

model = joblib.load("model/AquaSens_decision_tree_model.joblib")
encoder = joblib.load("model/AquaSens_feature_encoder.joblib")

TARGET_MAP = {0: "Low", 1: "Medium", 2: "High"}

def predict_irrigation(features):
    df = pd.DataFrame([features])

    if "Mulching_Used" in df.columns:
        df["Mulching_Used"] = df["Mulching_Used"].map({"Yes": 1, "No": 0})

    encoded = encoder.transform(df)
    pred = model.predict(encoded)[0]

    decision_path = extract_decision_path(model, encoded, encoded.columns)
    recommendation = agronomist_recommendation(TARGET_MAP[pred], features)

    return {
        "prediction": TARGET_MAP[pred],
        "decision_path": decision_path,
        "recommendation": recommendation
    }
