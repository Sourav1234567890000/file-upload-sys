const express = require("express");
const multer = require("multer");
const cors = require("cors");
const uploadRoutes = require("./routes/upload.routes");

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
