const mongoose = require("mongoose");

const HomeModelSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  phoneNumber: { type: String },
  description: { type: String },
  avatar: { type: String },
  role: {
    type: String,
    enum: ["admin", "user"],
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("home", HomeModelSchema);
