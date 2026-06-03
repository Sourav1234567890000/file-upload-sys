const express = require("express");
const uploadFile = require("../controllers/upload.controller");

const {
  loanUploadMiddleware,
  bankStatementUploadMulter,
} = require("../middleware/upload.middleware");

const {
  registerApplicant,
  getApplicant,
} = require("../controllers/applicant.controller");

const {
  registerCoApplicant,
  getCoApplicant,
} = require("../controllers/coApplicantion.controller");

const {
  getApplicantsCount,
  getApplicantDetails,
} = require("../controllers/dashBoard.controller");

const router = express.Router();

router.post("/upload", bankStatementUploadMulter, uploadFile);

router.post("/loan/aply/applicant", loanUploadMiddleware, registerApplicant);

router.post("/loan/aply/co-applicant",loanUploadMiddleware,registerCoApplicant);

router.get("/loan/dashboard/totalApplicants-count", getApplicantsCount);

router.get("/loan/dashboard/applicantDetails", getApplicantDetails);

router.get("/loan/applicant/:applicantId", getApplicant);

router.get("/loan/co-applicant/:applicantId", getCoApplicant);

module.exports = router;
