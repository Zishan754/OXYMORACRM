
const mongoose = require('mongoose');

const assigntasksSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'assign task', required: true },
  employee_name: { type: String, required: true, text: true },
  project_name: { type: String, text: true },
  task: { type: String, text: true },
  attachment: { type: String },
  deadline: { type: Date },

  assignedBy: { type: String, text:true },
  progress: { type: Number, default: 0},
  status: { type: Boolean, default: true },
   time: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("assigntask", assigntasksSchema);
