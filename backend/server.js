const express = require("express");
const multer = require("multer");
const cors = require("cors");

const app = express();

app.use(cors());

const PORT = 5000;

const data = {
  "start-date": "12/01/2026",
  "end-date": "10/04/2026",
  "total-transaction": "1600000",
  "total-credit-transaction": "10000000",
  "loan-amount": "500000",
  "total-debit-transaction": "6000000",
};

app.get("/", (req, res) => {
  res.send("Server running");
});

/* Receive file
Read file content
Convert into structured data
Return response */

/* 
loanAmount = 5,00,000

requiredFlow = loanAmount * 2
             = 10,00,000

if totalCredits >= requiredFlow
    → SUCCESS
else
    → FAILED
*/

/*
FLOW

1. Upload file (CSV/PDF)

2. Parse file
   → transactions[]

3. Normalize data
   → { date, amount, type: "credit" | "debit" }

4. Filter by period
   → date >= (today - X months)   // 3 / 6 / 12

5. Calculate
   → totalCredits (only type === "credit")

6. Logic
   requiredFlow = loanAmount * 2

   if totalCredits >= requiredFlow
       status = "success"
   else
       status = "failed"

7. Response
   → { status, totalCredits }
*/

// multer
const upload = multer({
  storage: multer.memoryStorage(),
});

app.post("/upload", upload.single("file"), function (req, res) {
  const file = req.file;

  // check file
  if (!file) {
    return res.status(400).json({
      status: "error",
      message: "file not received",
    });
  }

  // validate type
  if (file.mimetype !== "application/pdf" && file.mimetype !== "text/csv") {
    return res.status(400).json({
      status: "error",
      message: "file type should be pdf or csv",
    });
  }

  // validate size (2MB - 10MB)
  const minSize = 2 * 1024 * 1024;
  const maxSize = 1024 * 1024 * 1024;

  if (file.size > maxSize) {
    return res.status(400).json({
      status: "error",
      message: "file size must be between 2MB and 10MB",
    });
  }

  // success
  return res.status(200).json({
    status: "success",
    message: "file uploaded successfully",
  });
});

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});
