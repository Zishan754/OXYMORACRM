const express = require('express');
const employeeControllers = require("../controllers/employee.controllers");
// const imageStorage = require("../middlewares/fileUpload")
const { fileUpload } = require("../middlewares/fileUpload")


const router = express.Router();

router.post("/login-employee",employeeControllers.loginEmployee);
router.post("/add-employee-timesheet", fileUpload.single("attachment"), employeeControllers.addEmployeeTimesheet);
router.post("/view-employee-timesheet",employeeControllers.viewEmployeeTimesheetTable);




module.exports = router;


