const LoanApplication = require("../models/loanApplicationForm.model");

const registerApplicant = async (req, res) => {
  console.log(req.body);
  const user = new LoanApplication(req.body);

  const loanAmount = req.body.loanAmount;
  await user.save();

  return res.status(200).json({
    status: "success",
    message: "form submitted successfully",
  });
};

module.exports = registerApplicant;
