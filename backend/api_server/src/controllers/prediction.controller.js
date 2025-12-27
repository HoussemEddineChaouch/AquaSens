const Prediction = require("../models/Prediction");
const { callMLModel } = require("../services/ml.service");

exports.createPrediction = async (req, res) => {
  const mlResult = await callMLModel(req.body);

  const prediction = await Prediction.create({
    userId: req.user.id,
    input: req.body,
    result: mlResult.prediction,
    decisionPath: mlResult.decision_path,
    recommendation: mlResult.recommendation
  });

  res.json(prediction);
};
