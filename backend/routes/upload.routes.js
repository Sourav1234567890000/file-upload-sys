const express = require("express");
const uploadFile = require("../controllers/upload.controller");
const {
  loanUploadMiddleware,
  bankStatementUploadMulter,
} = require("../middleware/upload.middleware");
const registerApplicant = require("../controllers/applicant.controller");
const registerCoApplicant = require("../controllers/coApplicantion.controller");

const router = express.Router();

router.post("/upload", bankStatementUploadMulter, uploadFile);

router.post("/loan/aply/applicant", loanUploadMiddleware, registerApplicant);

router.post("/loan/aply/co-applicant", loanUploadMiddleware, registerCoApplicant);

module.exports = router;
