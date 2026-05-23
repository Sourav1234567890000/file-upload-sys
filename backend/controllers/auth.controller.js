const userModel = require("../models/user.model");

const logIn = async (req, res) => {
  try {
    const userEmail = await userModel.findOne({ email: req.body.email });
    const password = await userModel.findOne(userEmail.select("+password"));
    if (!userEmail) {
      return res.status(404).json({
        status: "error",
        message: "user not registered",
      });
    }

    const isMatch = await bcrypt.compare(req.body.password, password);

    if (!isMatch) {
      return res.status(404).json({
        status: "error",
        message: "Invalid credentials",
      });
    }
    // role define

    // const user = new userModel({ ...req.body, password: hashedPassword });
  } catch (error) {}
};
