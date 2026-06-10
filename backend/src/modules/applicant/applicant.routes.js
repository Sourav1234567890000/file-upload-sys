const express = require("express");

const {
  registerApplicant,
  getApplicant,
  getApplicantsCount,
  getApplicantDetails,
} = require("./applicant.controller");

const {
  verifyToken,
  accessScope,
} = require("../../middleware/auth.middleware");

const { loanUploadMiddleware } = require("../../middleware/upload.middleware");

const router = express.Router();

router.post(
  "/apply/applicant",
  loanUploadMiddleware,
  verifyToken,
  registerApplicant,
);

router.get("/applicant/:applicantId", verifyToken, getApplicant);

router.get(
  "/dashboard/totalApplicants-count",
  verifyToken,
  accessScope,
  getApplicantsCount,
);

router.get(
  "/dashboard/applicantDetails",
  verifyToken,
  accessScope,
  getApplicantDetails,
);

module.exports = router;
