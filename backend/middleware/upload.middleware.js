const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

const bankStatementUploadMulter = upload.single("file");
const loanUploadMiddleware = upload.fields([
  { name: "panCard" },
  { name: "aadhaarCard" },
]);

module.exports = { bankStatementUploadMulter, loanUploadMiddleware };
