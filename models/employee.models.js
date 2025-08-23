


const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'employee', required: true },
  employee_name: { type: String, required: true, text: true },
  login_time: { type: String, text: true },
  logout_time: { type: String, text: true },
  project_name: { type: String, text: true },
  hours: { type: String, text: true },
  task: { type: String, text: true },
  next_day_task: { type: String, text: true },
  attachment: { type: String },
  suggestions: {type: String, text: true},
  

  status: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model("employeetimesheet", employeeSchema);
