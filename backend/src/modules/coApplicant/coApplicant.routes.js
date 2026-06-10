const express = require("express");

const {
  registerCoApplicant,
  getCoApplicant,
} = require("./coApplicant.controller");

const {
  verifyToken,
} = require("../../middleware/auth.middleware");

const {
  loanUploadMiddleware,
} = require("../../middleware/upload.middleware");

const router = express.Router();

router.post(
  "/apply/co-applicant",
  loanUploadMiddleware,
  verifyToken,
  registerCoApplicant
);

router.get(
  "/co-applicant/:applicantId",
  verifyToken,
  getCoApplicant
);

module.exports = router;