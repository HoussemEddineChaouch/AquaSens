def agronomist_recommendation(level, features):
    if level == "High":
        return {
            "action": "Immediate irrigation required",
            "advice": [
                "Apply drip irrigation if available",
                "Monitor soil moisture daily",
                "Avoid irrigation during peak sunlight hours"
            ]
        }

    if level == "Medium":
        return {
            "action": "Moderate irrigation recommended",
            "advice": [
                "Irrigate within 24–48 hours",
                "Check weather forecast for rainfall",
                "Use mulching to reduce evaporation"
            ]
        }

    return {
        "action": "No irrigation required",
        "advice": [
            "Soil moisture is sufficient",
            "Re-evaluate in 3–5 days",
            "Avoid unnecessary watering"
        ]
    }
