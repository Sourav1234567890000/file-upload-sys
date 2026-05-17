const coApplicantModel = require("../models/co-applicant.model");

const registerCoApplicant = async (req, res) => {
  try {
    console.log("requested data : ", req.body);
    console.log("requested file : ", req.files);

    const aadhaarCardFile = req.files?.aadhaarCard?.[0];

    if (!aadhaarCardFile) {
      return res.status(400).json({
        status: "error",
        message: "aadhar card required",
      });
    }

    const coApplicant = new coApplicantModel({
      ...req.body,

      // saving files
      aadhaarCard: aadhaarCardFile.originalname,
    });

    // Save co-applicant
    await coApplicant.save();

    // Return success and linked applicantId
    return res.status(200).json({
      status: "success",
      message: "Co-Applicant saved successfully",
      applicantId: coApplicant.applicantId, // link to applicant
      coApplicantId: coApplicant._id,
    });
  } catch (error) {
    console.error("Error saving co-applicant:", error);
    return res.status(400).json({
      status: "error",
      message: "Co-Applicant not saved",
      error: error.message,
    });
  }
};

const getCoApplicant = async (req, res) => {
  try {
    const coApplicant = await coApplicantModel.find({
      applicantId: req.params.applicantId,
    });
    const coApplicantCount = await coApplicantModel.countDocuments({
      applicantId: req.params.applicantId,
    });

    return res.status(200).json({
      status: "success",
      coApplicant,
      coApplicantCount,
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = {
  registerCoApplicant,
  getCoApplicant,
};
