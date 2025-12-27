const mongoose = require("mongoose");

const PredictionSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  input: Object,
  result: String,
  decisionPath: Array,
  recommendation: Object,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Prediction", PredictionSchema);
