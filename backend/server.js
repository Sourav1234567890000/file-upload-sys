require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const uploadRoutes = require("./routes/upload.routes");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MONGODB connected");
  })
  .catch((error) => {
    console.log("MONGODB not connected ", error);
  });

const app = express();

app.use(cors());

const PORT = 5000;

app.get("/", (req, res) => {
  res.send("Server running");
});

app.use("/api", uploadRoutes);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
