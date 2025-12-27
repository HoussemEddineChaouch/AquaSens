const Prediction = require("../models/Prediction");

exports.getHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const history = await Prediction.find({ userId }).sort({ createdAt: -1 });

    const formattedHistory = history.map((item) => ({
      id: item._id,
      date: item.createdAt,
      crop: item.input.Crop_Type,
      soil: item.input.Soil_Type,
      result: item.result,
    }));

    res.json(formattedHistory);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getPredictionDetails = async (req, res) => {
  const pred = await Prediction.findById(req.params.id);
  res.json(pred);
};
