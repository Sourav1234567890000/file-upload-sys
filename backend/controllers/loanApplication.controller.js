const loanApplicationForm = (req, res) => {
  console.log(req);
  return res.status(200).json({
    status: "success",
    message: "form submitted successfully",
  });
};

module.exports = loanApplicationForm;
