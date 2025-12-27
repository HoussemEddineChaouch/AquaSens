const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const historyController = require("../controllers/history.controller");

router.get("/", auth, historyController.getHistory);
router.get("/:id", auth, historyController.getPredictionDetails);

module.exports = router;
