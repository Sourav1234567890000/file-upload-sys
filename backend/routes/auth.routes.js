const express = require("express");
const {
  registerLoanOfficer,
  loginLoanOfficer,
} = require("../controllers/loanOfficer.controller");

const router = express.Router();

router.post("/signup", registerLoanOfficer);
router.post("/login", loginLoanOfficer);

module.exports = router;
