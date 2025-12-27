const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const predictionController = require("../controllers/prediction.controller");

router.post("/", auth, predictionController.createPrediction);

module.exports = router;
