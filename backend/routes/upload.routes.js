const express = require("express");
const uploadFile = require("../controllers/upload.controller");
const uploadMulter = require("../middleware/upload.middleware");
const loanApplicationForm = require("../controllers/loanApplication.controller");

const router = express.Router();

router.post("/upload", uploadMulter, uploadFile);

router.post("/loan/apply", loanApplicationForm);

module.exports = router;
