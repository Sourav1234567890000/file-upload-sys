const csvParser = require("../services/csvParser");
const fileValidator = require("../services/fileValidator");

const uploadFile = (req, res) => {
  try {
    const file = req.file;
    let loanAmount = 25000;

    // check file
    if (!file) {
      return res.status(400).json({
        status: "error",
        message: "file not received",
      });
    }

    // validate file
    fileValidator(file);

    // call parser
    const totalCredit = csvParser(file);

    // check for loan eligiblity
    if (loanAmount * 2 <= totalCredit) {
      return res.status(200).json({
        status: "success",
        message: "eligible",
      });
    } else {
      return res.status(400).json({
        status: "error",
        message: "not eligible",
      });
    }

    // call analyzer

    // success
    return res.status(200).json({
      status: "success",
      message: "file uploaded successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = uploadFile;
