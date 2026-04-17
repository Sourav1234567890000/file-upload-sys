const fileValidator = require("../services/fileValidator");

const uploadFile = (req, res) => {
  try {
    const file = req.file;

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
