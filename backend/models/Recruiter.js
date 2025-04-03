const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  companyLogo: { type: String }
});

module.exports = mongoose.model("Recruiter", recruiterSchema);
