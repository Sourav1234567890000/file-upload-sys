const express = require("express");

const applicantRoutes = require("../src/modules/applicant/applicant.routes");
const coApplicantRoutes = require("../src/modules/coApplicant/coApplicant.routes");
const authRoutes = require("../src/modules/auth/auth.routes");

const router = express.Router();

router.use("/loan", applicantRoutes);
router.use("/loan", coApplicantRoutes);
router.use("/auth", authRoutes);

module.exports = router;