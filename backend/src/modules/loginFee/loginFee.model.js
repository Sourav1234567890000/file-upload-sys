const mongoose = require("mongoose");

const loginFeeSchema = new mongoose.Schema(
  {
    // entity info
    applicantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Applicant",
      required: true,
    },

    // processing fee section
    productType: {
      type: String,
      enum: ["login_fee", "other"],
      default: "login_fee",
      required: true,
    },

    decision: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    decisionComment: {
      type: String,
      default: "",
      required: true,
    },

    //   payment collection section
    waiverStatus: {
      type: Boolean,
      default: false,
    },

    finalLoginFee: {
      type: Number,
      required: true,
    },

    paymentMode: {
      type: String,
      enum: ["upi", "cheque", "neft", "rtgs", "imps"],
    },

    paymentReferenceNumber: {
      type: String,
      default: "",
    },

    paymentDate: {
      type: Date,
    },

    // Stage Tracking
    stageStatus: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },

    completedAt: {
      type: Date,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("loginFee", loginFeeSchema);
