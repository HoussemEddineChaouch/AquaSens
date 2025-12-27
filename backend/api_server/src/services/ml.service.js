const axios = require("axios");

exports.callMLModel = async (features) => {
  const res = await axios.post("http://localhost:5001/predict", features);
  return res.data;
};
