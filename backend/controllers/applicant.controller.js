const applicantModel = require("../models/applicant.model");

const registerApplicant = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    // Extract email
    const applicantEmail = req.body.email;

    // Validate required fields
    if (!applicantEmail) {
      return res.status(400).json({
        status: "error",
        message: "Email is required",
      });
    }

    // Check if applicant already exists
    const existingApplicant = await applicantModel.findOne({
      email: applicantEmail,
    });

    if (existingApplicant) {
      return res.status(400).json({
        status: "error",
        message: "Email already exists",
      });
    }

    // Save applicant
    const applicant = new applicantModel(req.body);
    await applicant.save(); 

    // Optional: set stage/status field
    // applicant.status = "applicant_saved";
    // await applicant.save();

    // Return applicantId for frontend
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

module.exports = registerApplicant;