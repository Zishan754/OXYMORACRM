const notificationModel = require("../models/notification.models");
const { StatusCodes } = require("http-status-codes");

module.exports.addNotification = async (req, res) => {
  try {
    const { employeeId, message, taskId, admin } = req.body;

    if (!message) {
      return res.json({
        status: StatusCodes.BAD_REQUEST,
        success: false,
        message: "Message is required",
      });
    }

    const newNotification = await notificationModel.create({
      employeeId,
      message,
      taskId,
      admin: admin || false,

    });

    await newNotification.save();

    return res.json({
      status: StatusCodes.OK,
      success: true,
      message: "Notification sent successfully",
      data: newNotification,
    });
  } catch (err) {
    return res.json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      success: false,
      message: err.message,
    });
  }
};




module.exports.getEmployeeNotifications = async (req, res) => {
  try {
    const { employeeId } = req.body;

    if (!employeeId) {
      return res.json({
        status: StatusCodes.BAD_REQUEST,
        success: false,
        message: "Employee ID is required",
      });
    }

    const notifications = await notificationModel.find({ employeeId }).sort({ createdAt: -1 });

    return res.json({
      status: StatusCodes.OK,
      success: true,
      data: notifications,
    });
  } catch (err) {
    return res.json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      success: false,
      message: err.message,
    });
  }
};



module.exports.markAllAsRead = async (req, res) => {
  try {
    const { employeeId } = req.body;

    await notificationModel.updateMany(
      { employeeId, isRead: false },
      { isRead: true, readAt: new Date() }
    );

    return res.json({
      status: 200,
      success: true,
      message: "All notifications marked as read",
    });
  } catch (err) {
    return res.json({
      status: 500,
      success: false,
      message: err.message,
    });
  }
};




// Get all admin notifications
module.exports.getAdminNotifications = async (req, res) => {
  try {
    const notifications = await notificationModel.find({ admin: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Mark all admin notifications as read
module.exports.markAdminNotificationsAsRead = async (req, res) => {
  try {
    await notificationModel.updateMany(
      { admin: true, isRead: false },
      { isRead: true, readAt: new Date() }
    );
    res.json({ success: true, message: "Admin notifications marked as read" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


