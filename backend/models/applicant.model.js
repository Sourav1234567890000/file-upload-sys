const mongoose = require("mongoose");

/*MongoDB stores data as plain JSON — it doesn't care about structure. You can store anything in any shape.
mongoose.Schema lets you define the rules — what fields exist, what types they are, which ones are required. It brings structure to MongoDB's flexibility.
Without it: anyone could store garbage data in your database.
With it: only valid loan application data gets stored.
*/

const loanApplicationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  middleName: {
    type: String,
    required: true,
    lowercase: false,
    trim: true,
    index: true,
  },
  lastName: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  aadhaarCard: {
    type: String,
    required: true,
    unique: true,
  },
  aadhaarNumber: {
    type: String,
    required: true,
    unique: true,
  },
  panCard: {
    type: String,
    required: true,
    unique: true,
  },
  panNumber: {
    type: String,
    required: true,
    unique: true,
  },
  loanAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
  },
  statementUploaded: {
    type: Boolean,
    default: false,
  },
  statementResult: { type: String, default: "failed" },
});

/*mongoose.model() takes your schema and creates a Model — which is the actual tool you use to interact with the database.
Think of it like:

Schema = blueprint of the data structure
Model = the actual class you use to create, read, update, delete records

Without this line you have a blueprint but no way to use it. This line connects the two. */

module.exports = mongoose.model("applicant", loanApplicationSchema);
