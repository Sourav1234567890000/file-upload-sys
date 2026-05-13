const coApplicantModel = require("../models/co-applicant.model");

const registerCoApplicant = async (req, res) => {
  try {
    // Create co-applicant
    const coApplicant = new coApplicantModel(req.body);

    // Save co-applicant
    await coApplicant.save();

    // Return success and linked applicantId
    return res.status(200).json({
      status: "success",
      message: "Co-Applicant saved successfully",
      applicantId: coApplicant.applicantId, // link to applicant
      coApplicantId: coApplicant._id
    });

  } catch (error) {
    console.error("Error saving co-applicant:", error);
    return res.status(400).json({
      status: "error",
      message: "Co-Applicant not saved",
      error: error.message
    });
  }
};

module.exports = registerCoApplicant;