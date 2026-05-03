const LoanApplication = require("../models/applicant.model");

const registerApplicant = async (req, res) => {
  console.log(req.body);

  /*new LoanApplication(req.body) creates a new Mongoose document 
  instance from the form data.
  Think of it like:

  LoanApplication is the blueprint (schema)
  new LoanApplication(req.body) is the actual object created from that blueprint, filled with the applicant's data
  .save() then writes it to MongoDB

  Without new you just have the model class — you need an instance to save actual data. */
  const user = new LoanApplication(req.body);

  const loanAmount = req.body.loanAmount;
  const email = req.body.email;
  await user.save();

  return res.status(200).json({
    status: "success",
    message: "form submitted successfully",
    data: { loanAmount, email },
  });
};

module.exports = registerApplicant;
