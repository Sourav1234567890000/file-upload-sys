const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });

    if (req.user.role !== "superAdmin") {
      return res.status(403).json({
        status: "error",
        message: "user dont have permission",
      });
    }
    if (user) {
      return res.status(404).json({
        status: "error",
        message: "user already registered please sign in",
      });
    }

    // create user with roles
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new userModel({
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });

    await newUser.save();
    return res.status(200).json({
        status : "success",
        message : "user created successfully"
    })
  } catch (error) {
    console.error(error);
  }
};

module.exports = registerUser;
