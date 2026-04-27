const express = require("express");
const uploadFile = require("../controllers/upload.controller");
const {
  loanUploadMiddleware,
  bankStatementUploadMulter,
} = require("../middleware/upload.middleware");
const registerApplicant = require("../controllers/loanApplication.controller");

const router = express.Router();

router.post("/upload", bankStatementUploadMulter, uploadFile);

router.post("/loan/apply", loanUploadMiddleware, registerApplicant);

module.exports = router;
