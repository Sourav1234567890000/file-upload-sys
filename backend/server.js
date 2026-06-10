require("dotenv").config();

const mongoose = require("mongoose");
const app = require("./src/app");

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MONGODB connected");

    app.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB not connected", error);
  });