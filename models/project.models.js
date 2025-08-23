

const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  project_name: { type: String, text: true },
  description: { type: String },
  attachment: { type: String },
  status: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("project", projectSchema);
