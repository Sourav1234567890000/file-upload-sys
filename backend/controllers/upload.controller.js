const csvParser = require("../services/csvParser");
const fileValidator = require("../services/fileValidator");
const LoanApplication = require("../models/loanApplicationForm.model");

const uploadFile = async (req, res) => {
  try {
    const file = req.file;

    const email = req.body.email;

    const applicant = await LoanApplication.findOne({ email: email });

    // if applicant not match
    if (!applicant) {
      return res.status(404).json({
        status: "error",
        message: "applicant not found",
      });
    }

    // check if statement used before
    if (applicant.statementUploaded) {
      return res.status(404).json({
        status: "error",
        message: "statement is used before please use another statement",
      });
    }
    // if match then we extract loan
    const loanAmount = applicant.loanAmount;

    // check file
    if (!file) {
      return res.status(400).json({
        status: "error",
        message: "file not received",
      });
    }

    // validate file
    fileValidator(file);

    // call parser
    const totalCredit = csvParser(file);

    // check for loan eligiblity
    if (loanAmount * 2 <= totalCredit) {
      applicant.status = "approved";
      applicant.statementUploaded = true;
      applicant.statementResult = "passed";
      await applicant.save();
      return res.status(200).json({
        status: "success",
        message: "eligible",
      });
    } else {
      applicant.statementUploaded = true;
      await applicant.save();
      return res.status(400).json({
        status: "error",
        message: "not eligible",
      });
    }

    // call analyzer

    // success
    return res.status(200).json({
      status: "success",
      message: "file uploaded successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = uploadFile;
