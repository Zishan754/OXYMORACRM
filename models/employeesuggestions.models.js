// const mongoose = require("mongoose");

// const suggestionsSchema = new mongoose.Schema(
//   {
//     title: { type: String, text: true },
//     suggestion: { type: String, text: true },
//     message: { type: String, text: true },
//     file: { type: String }, // stores filename (e.g., abc.pdf)
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("suggestions", suggestionsSchema);


const mongoose = require('mongoose');

const suggestionsSchema = new mongoose.Schema({
  title: { type: String, text: true },
  suggestion: { type: String, text: true },
  message: { type: String, text: true },
  file: { type: String },
  employeeName: { type: String },
  employeeId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("suggestions", suggestionsSchema);
