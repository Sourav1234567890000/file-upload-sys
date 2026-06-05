const express = require("express");
const logIn = require("../controllers/auth.controller");
const registerUser = require("../controllers/superAdmin.controller");
const { verifyToken, authorizeRole } = require("../middleware/auth.middleware");
const router = express.Router();

router.post("/login", logIn);

router.post("/signup", verifyToken, authorizeRole("superAdmin"), registerUser);

module.exports = router;
