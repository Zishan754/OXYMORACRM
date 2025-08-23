const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'employee', required: true },
  employee_name: { type: String, required: true, text: true },
  from_date:{ type: String, text:true},
  to_date: {type: String, text:true},
  leave_type: {type: String, text:true},
  reason: {type:String, text:true},
  attachment: {type:String},
  profileImage:{type:String, required: true, text:true},
  status: { type: String, default: "Pending" }
}, {timestamps:true});

module.exports = mongoose.model("Leaves", leaveSchema)