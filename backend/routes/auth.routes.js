const express = require("express");
const logIn = require("../controllers/auth.controller");
const router = express.Router();

router.post("/login", logIn);

module.exports = router;
