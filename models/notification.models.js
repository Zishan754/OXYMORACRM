
const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: "employee", required: false },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "assignTask" },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  status: { type: Boolean, default: true },
  admin: { type: Boolean, default: false }, 
  readAt: { type: Date },
  type: { type: String, enum: ["requirement", "leave", "inventory", "task"], required: true },
}, { timestamps: true });

module.exports = mongoose.model("notification", notificationSchema);


