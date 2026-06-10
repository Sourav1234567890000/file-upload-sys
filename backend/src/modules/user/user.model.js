const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
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
      select: false,
    },
    role: {
      type: String,
      required: true,
      enum: ["superAdmin", "admin", "rm"],
    },
    permissions: [String],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("user", userSchema);

