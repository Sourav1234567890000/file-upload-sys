const mongoose = require("mongoose");

const coApplicantSchema = new mongoose.Schema({
  applicantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Applicant",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  middleName: {
    type: String,
    required: true,
    lowercase: false,
    trim: true,
    index: true,
  },
  lastName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  aadhaarCard: {
    type: String,
    required: true,
    unique: true,
  },
  aadhaarNumber: {
    type: String,
    required: true,
    unique: true,
  },
  relation: {
    type: String,
    required: true,
    enum: [
      "spouse",
      "father",
      "mother",
      "brother",
      "sister",
      "son",
      "daughter",
      "friend",
      "business_partner",
      "other",
    ],
    lowercase: true,
    trim: true,
  },
});

module.exports = mongoose.model("coApplicant", coApplicantSchema);
