const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notification.controllers");

// Routes
router.post("/add-notification", notificationController.addNotification);
router.post("/get-employee-notifications", notificationController.getEmployeeNotifications);
router.post("/mark-all-read", notificationController.markAllAsRead);

router.post("/get-admin-notifications", notificationController.getAdminNotifications);
router.post("/mark-admin-notifications-read", notificationController.markAdminNotificationsAsRead);


module.exports = router;
