const applicantModel = require("../applicant/applicant.model");
const coApplicantModel = require("./co-applicant.model");

const registerCoApplicant = async (req, res) => {
  try {
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
    const { applicantId } = req.params;

    const applicant = await applicantModel.findById(applicantId);

    if (!applicant) {
      return res.status(404).json({
        status: "error",
        message: "Applicant not found",
      });
    }

    if (applicant.createdBy != req.user.id) {
      return res.status(403).json({
        status: "error",
        message: "Access denied",
      });
    }

    const coApplicant = await coApplicantModel.find({ applicantId });

    const coApplicantCount = await coApplicantModel.countDocuments({
      applicantId,
    });

    return res.status(200).json({
      status: "success",
      coApplicant,
      coApplicantCount,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  registerCoApplicant,
  getCoApplicant,
};
