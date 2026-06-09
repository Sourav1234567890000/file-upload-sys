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
const { verifyToken } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/upload", bankStatementUploadMulter, uploadFile);

router.post("/loan/aply/applicant", loanUploadMiddleware, verifyToken, registerApplicant);

router.post("/loan/aply/co-applicant",loanUploadMiddleware, verifyToken, registerCoApplicant);

router.get("/loan/dashboard/totalApplicants-count", verifyToken, getApplicantsCount);

router.get("/loan/dashboard/applicantDetails", verifyToken,  getApplicantDetails);

router.get("/loan/applicant/:applicantId", verifyToken,  getApplicant);

router.get("/loan/co-applicant/:applicantId", verifyToken,  getCoApplicant);

module.exports = router;
