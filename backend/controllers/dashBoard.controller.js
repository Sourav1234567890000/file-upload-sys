const applicantModel = require("../models/applicant.model");

const getApplicantsCount = async (req, res) => {
  try {
    console.log("get applicants count", req.user);
    const totalApplicantCount = await applicantModel.countDocuments({
      createdBy: req.user.id,
    });
    return res.status(200).json({
      status: "success",
      totalApplicantCount,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const getApplicantDetails = async (req, res) => {
  try {
    const applicantDetails = await applicantModel.find(
      { createdBy : req.user.id},
      { firstName: 1, loanAmount: 1 },
    );
    return res.status(200).json({
      status: "success",
      applicantDetails,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getApplicantsCount,
  getApplicantDetails,
};
