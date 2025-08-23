
const mongoose = require('mongoose');

const requirementSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'requirement', required: true },
  requirement: { type: String, text: true },
  adminComment: { type: String, text: true },
  attachment: { type: String },
  deadline:{type:String,text:true},
  sendBy: { type: String, text:true },
  status: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("requirement", requirementSchema);
