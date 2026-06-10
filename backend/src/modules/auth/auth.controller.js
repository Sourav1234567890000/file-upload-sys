const userModel = require("../user/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const logIn = async (req, res) => {
  try {
    const user = await userModel
      .findOne({ email: req.body.email })
      .select("+password");

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "user not registered",
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(404).json({
        status: "error",
        message: "Invalid credentials",
      });
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        role: user.role,
        permissions: user.permissions,
      },
      process.env.JWT_ACCESSTOKEN_SECRET,
      { expiresIn: "15m" },
    );

    return res.status(200).json({
      status : "success",
      message : "user logged in successfully",
      token : accessToken,
      userInfo :  {
        user : user.userName,
        email : user.email
      }
    })


  } catch (error) {
    console.error(`login error ${error}`);
  }
};

module.exports = logIn;
