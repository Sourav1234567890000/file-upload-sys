require("dotenv").config();
const express = require("express");
const multer = require("multer");
const cors = require("cors");
const loanRoutes = require("./routes/loan.routes");
const authRoutes = require("./routes/auth.routes");
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

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", loanRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
