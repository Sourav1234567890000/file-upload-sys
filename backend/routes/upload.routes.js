const express = require("express");
const uploadFile = require("../controllers/upload.controller");
const uploadMulter  = require("../middleware/upload.middleware")

const router = express.Router();

router.post("/upload", uploadMulter, uploadFile);

module.exports = router;
