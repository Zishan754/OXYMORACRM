const express = require('express');
const router = express.Router();
const { fileUpload } = require('../middlewares/fileUpload');
const addleaverequestController = require('../controllers/addleaverequest.controllers');

// Add leave
router.post('/add-leave-request', fileUpload.single('attachment'), addleaverequestController.addLeaveRequest);

router.post("/view-employee-leave-request-table",addleaverequestController.viewEmployeeLeavesTable);
router.post("/view-employee-leave-request-admin-table",addleaverequestController.viewEmployeeLeavesAdminTable)


// Approve or Reject leave
router.post('/update-leave-status', addleaverequestController.updateLeaveStatus);

module.exports = router;
