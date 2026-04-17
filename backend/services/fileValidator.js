const fileValidator = (file) => {
  // validate type
  if (file.mimetype !== "application/pdf" && file.mimetype !== "text/csv") {
    throw new Error("file type should be pdf or csv");
  }

  // validate size (2MB - 10MB)
  const minSize = 2 * 1024 * 1024;
  const maxSize = 264 * 1024 * 1024;

  if (file.size > maxSize) {
    throw new Error("file size must be between 2MB and 264MB");
  }
};

module.exports = fileValidator;
