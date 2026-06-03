require("dotenv").config();
const mongoose = require("mongoose");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");

const user = {
  userName: process.env.SUPERADMIN_NAME,
  email: process.env.SUPERADMIN_EMAIL,
  role: "superAdmin",
  permissions: ["all"],
  isActive: true,
};

mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    // all your seed logic goes here inside .then()

    try {
      console.log("MongoDB connected");
      // correct — checks by email, prevents duplicate for same email
      const superAdmin = await userModel.findOne({
        email: process.env.SUPERADMIN_EMAIL,
      });
      // Step 2 — If exists, log and exit
      if (superAdmin) {
        console.log("super admin is exist and logged in");
        mongoose.disconnect();
      } else {
        const hashedPassword = await bcrypt.hash(
          process.env.SUPERADMIN_PASSWORD,
          10,
        );
        const superAdmin = new userModel({
          ...user,
          password: hashedPassword,
        });
        await superAdmin.save();
        console.log("super admin is successfully created");
        mongoose.disconnect();
      }
    } catch (error) {
      console.log(error);
    }
  })
  .catch((error) => {
    console.log("MongoDB not connected", error);
  });
