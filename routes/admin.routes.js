const express = require('express');
const adminControllers = require("../controllers/admin.controllers");
const imageUpload = require("../middlewares/fileUpload");


const router = express.Router()

router.post("/add-employee",imageUpload.fileUpload.single("profileImage"),adminControllers.addEmployee);
router.post("/view-employee",adminControllers.viewEmployee)
router.post("/delete-employee",adminControllers.deleteEmployee)
router.post("/edit-employee",imageUpload.fileUpload.single("profileImage"),adminControllers.editEmployee);

router.post("/check-employee-id", adminControllers.checkEmployeeId);

module.exports = router;