from flask import Flask, request, jsonify
from services.predictor import predict_irrigation
import numpy as np
import json

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    result = predict_irrigation(data)

    # Convert numpy types to Python
    def convert(o):
        if isinstance(o, (np.integer, np.int64)):
            return int(o)
        elif isinstance(o, (np.floating, np.float64)):
            return float(o)
        elif isinstance(o, np.ndarray):
            return o.tolist()
        else:
            return o

    result_serializable = json.loads(json.dumps(result, default=convert))
    return jsonify(result_serializable)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
