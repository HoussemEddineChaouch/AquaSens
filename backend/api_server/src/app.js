require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth.routes");
const predictionRoutes = require("./routes/prediction.routes");
const historyRoutes = require("./routes/history.routes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  })
);

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use("/api/auth", authRoutes);
app.use("/api/predictions", predictionRoutes);
app.use("/api/history", historyRoutes);

app.listen(5000, () => {
  console.log("API server running on port 5000");
});
