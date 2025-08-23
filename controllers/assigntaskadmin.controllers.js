// const adminModel = require('../models/admin.models')
const assigntasksModel = require('../models/assigntasks.models');
const Notification = require("../models/notification.models");
const StatusCodes = require('http-status-codes');


// assign task by admin to Employee and Employee TL
module.exports.assignTaskAdmin = async (req, res) => {
  try {
    const {
      project_name,
      employee_name,
      task,
      deadline,
      employeeId,
      time, //  added
      assignedBy: assignedBy,
      
    } = req.body;

    const attachment = req.file ? req.file.filename : "";

    const newEntry = await assigntasksModel.create({
      project_name,
      employee_name,
      task,
      attachment,
      deadline,
      employeeId,
      time, //  store time
      assignedBy: assignedBy,
    });

    //  create notification properly
    await Notification.create({
      employeeId,
      message: `New Task Assigned: ${task}`,
      type: "task",
      taskId: newEntry._id,
    });

    res.status(200).json({
      message: "Task Add Successfully",
      success: true,
      data: newEntry,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};




// assign task by tl to Employee
module.exports.assignTaskTL = async (req, res) => {
  try {
    const {
      project_name,
      employee_name,
      task,
      deadline,
      employeeId,
      time,
      assignedBy: assignedBy,
      
    } = req.body;

    const attachment = req.file ? req.file.filename : "";

    const newEntry = await assigntasksModel.create({
      project_name,
      employee_name,
      task,
      attachment,
      deadline,
      employeeId,
      time,
      assignedBy: assignedBy,
    });

    //  create notification properly
    await Notification.create({
      employeeId,
      message: `New Task Assigned: ${task}`,
      type: "task",
      taskId: newEntry._id,
    });

    res.status(200).json({
      message: "Task Add Successfully",
      success: true,
      data: newEntry,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


// assign task show only TL form TL
module.exports.viewTasksByTL = async (req, res) => {
  try {
    const { assignedBy } = req.body;
    const tasks = await assigntasksModel.find({ assignedBy }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};




// assign tasks show on admin in table
module.exports.viewTasksAdmin = async (req, res) => {
  try {
    const viewData = await assigntasksModel.find().sort({ createdAt: -1 });

    if (viewData.length > 0) {
      res.status(200).json({
        message: "Assign Task view successfully",
        success: true,
        error: false,
        data: viewData,
      });
    } else {
      res.json({
        message: "No Task found",
        error: true,
        success: false,
      });
    }
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: err.message,
    });
  }
};


// assign tasks show on employee table with specific id
module.exports.viewTaskEmployee = async (req, res) => {
  try {
    const { employeeId } = req.body;

    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required",
      });
    }

    const viewData = await assigntasksModel
      .find({ employeeId: employeeId })
      .sort({ createdAt: -1 });

    if (viewData.length > 0) {
      res.status(200).json({
        message: "Employee Task fetched successfully",
        success: true,
        error: false,
        data: viewData,
      });
    } else {
      res.json({
        message: "No Task data found for this employee",
        error: true,
        success: false,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};





exports.updateTaskProgress = async (req, res) => {
  try {
    const { taskId, progress } = req.body;

    const updated = await assigntasksModel.findByIdAndUpdate(
      taskId,
      { progress },
      { new: true }
    );

    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    console.error("Progress update failed", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


