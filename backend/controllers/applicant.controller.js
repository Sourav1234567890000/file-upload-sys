const applicantModel = require("../models/applicant.model");

const registerApplicant = async (req, res) => {
  try {
    console.log(req.user);

    const applicantEmail = req.body.email;

    if (!applicantEmail) {
      return res.status(400).json({
        status: "error",
        message: "Email is required",
      });
    }

    const existingApplicant = await applicantModel.findOne({
      email: applicantEmail,
    });

    if (existingApplicant) {
      return res.status(400).json({
        status: "error",
        message: "Email already exists",
      });
    }

    // Extract uploaded files
    const panCardFile = req.files?.panCard?.[0];
    const aadhaarCardFile = req.files?.aadhaarCard?.[0];

    if (!panCardFile || !aadhaarCardFile) {
      return res.status(400).json({
        status: "error",
        message: "Both PAN card and Aadhaar card are required",
      });
    }

    const applicant = new applicantModel({
      ...req.body,

      createdBy: req.user.id,
      // saving filenames for now
      panCard: panCardFile.originalname,
      aadhaarCard: aadhaarCardFile.originalname,
    });

    await applicant.save();

    return res.status(200).json({
      status: "success",
      message: "Applicant saved successfully",
      applicantId: applicant._id,
    });
  } catch (error) {
    console.error("Error saving applicant:", error);

    return res.status(500).json({
      status: "error",
      message: "Applicant not saved",
      error: error.message,
    });
  }
};

const getApplicant = async (req, res) => {
  try {
    const applicant = await applicantModel.findById(req.params.applicantId);
    if (applicant.createdBy == req.user.id) {
      console.log(applicant);
      return res.status(200).json({
        status: "success",
        applicant,
      });
    }
  } catch (error) {
    return res.status(500).json({ status: "error", message: error.message });
  }
};
module.exports = {
  registerApplicant,
  getApplicant,
};
