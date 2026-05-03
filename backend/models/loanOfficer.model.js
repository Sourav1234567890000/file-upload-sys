const mongoose = require("mongoose");

const loanOfficerSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
});

module.exports = mongoose.model("loanOfficer", loanOfficerSchema);
