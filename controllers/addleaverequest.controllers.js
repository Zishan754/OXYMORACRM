
const leaverequestModel = require("../models/leaverequest.models");
const leaveModel = require("../models/leaverequest.models");
const employeeModel = require('../models/employee.models');
const notificationModel = require("../models/notification.models");


const { StatusCodes } = require("http-status-codes");


// Add laeve request 
// module.exports.addLeaveRequest = async (req, res) => {
//   try {
//     const {
//       employeeId,
//       employee_name,
//       from_date,
//       to_date,
//       leave_type,
//       reason,
//       profileImage,
//     } = req.body;

//     const leaveData = {
//       employeeId,
//       employee_name,
//       from_date,
//       to_date,
//       leave_type,
//       reason,
//       profileImage,
//       status: "Pending",
//     };

//     if (req.file) {
//       leaveData.attachment = req.file.filename;
//     }

//     const newLeave = await leaverequestModel.create(leaveData);

//     return res.status(StatusCodes.OK).json({
//       success: true,
//       message: "Leave request submitted successfully",
//       data: newLeave,
//     });

//   } catch (err) {
//     return res.status(StatusCodes.BAD_REQUEST).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };



module.exports.addLeaveRequest = async (req, res) => {
  try {
    const {
      employeeId,
      employee_name,
      from_date,
      to_date,
      leave_type,
      reason,
      profileImage,
    } = req.body;

    const leaveData = {
      employeeId,
      employee_name,
      from_date,
      to_date,
      leave_type,
      reason,
      profileImage,
      status: "Pending",
    };

    if (req.file) {
      leaveData.attachment = req.file.filename;
    }

    // Leave request save karo
    const newLeave = await leaverequestModel.create(leaveData);

    // ✅ Admin ke liye notification create karo
    await notificationModel.create({
      message: "New leave request submitted",
      admin: true,
      type: "leave",   // <-- yaha tumne jo bola tha add kar diya
      isRead: false,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Leave request submitted successfully",
      data: newLeave,
    });

  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: err.message,
    });
  }
};




// view employee leave request table  with specefic id

module.exports.viewEmployeeLeavesTable = async (req, res) => {
  try {
    const { employeeId } = req.body;

    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required",
      });
    }

    const viewData = await leaverequestModel.find({ employeeId }).sort({ createdAt: -1 });

    if (viewData.length > 0) {
      res.status(200).json({
        message: "Employee leave requests fetched successfully",
        success: true,
        data: viewData,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "No leave requests found",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error: " + err.message,
    });
  }
};


// view admin page leave request table 
module.exports.viewEmployeeLeavesAdminTable = async (req, res) => {
  try {
    // Get all leave requests sorted by creation date (latest first)
    const viewData = await leaverequestModel.find().sort({ createdAt: -1 });

    if (viewData.length > 0) {
      res.status(200).json({
        message: "All employee leave requests fetched successfully",
        success: true,
        data: viewData,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "No leave requests found",
        data: [],
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error: " + err.message,
    });
  }
};



module.exports.updateLeaveStatus = async (req, res) => {
  try {
    const { leaveId, status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({
        status: StatusCodes.BAD_REQUEST,
        success: false,
        message: "Invalid status value. Must be 'Approved' or 'Rejected'."
      });
    }

    const existingLeave = await leaveModel.findById(leaveId);
    if (!existingLeave) {
      return res.status(404).json({
        status: StatusCodes.NOT_FOUND,
        success: false,
        message: "Leave request not found."
      });
    }

    //  REMOVED: status already updated check

    const updatedLeave = await leaveModel.findByIdAndUpdate(
      leaveId,
      { status },
      { new: true }
    );

    return res.json({
      status: StatusCodes.OK,
      success: true,
      message: `Leave ${status.toLowerCase()} successfully.`,
      data: updatedLeave
    });

  } catch (err) {
    return res.status(500).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      success: false,
      message: err.message
    });
  }
};

