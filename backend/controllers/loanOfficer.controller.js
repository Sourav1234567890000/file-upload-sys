const bcrypt = require("bcryptjs");
const loanOfficer = require("../models/loanOfficer.model");

const registerLoanOfficer = async (req, res) => {
  console.log(req.body);

  // check email exist in db
  const existing = await loanOfficer.findOne({ email: req.body.email });

  if (existing) {
    return res.status(404).json({
      status: "error",
      message: "loan officer already exist please sign in",
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const officer = new loanOfficer({ ...req.body, password: hashedPassword });

  await officer.save();
  return res.status(200).json({
    status: "OK",
    message: "loan officer registered successfully",
    data: { email: req.body.email },
  });
};

const loginLoanOfficer = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const existingEmail = await loanOfficer.findOne({ email: email });
  //  check if email not exist
  if (existingEmail) {
    const isMatch = await bcrypt.compare(password, existingEmail.password);
    if (!isMatch) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    return res.status(200).json({
      status: "OK",
      message: "loan officer sign in successfully",
      data: { email: email, userName : existingEmail.userName },
    });
  }

  if (!existingEmail) {
    return res.status(404).json({
      status: "error",
      message: "loan officer not registered, sign up",
    });
  }
};

module.exports = {
  registerLoanOfficer,
  loginLoanOfficer,
};
