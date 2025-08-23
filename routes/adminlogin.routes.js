const express = require('express');
const adminloginControllers = require("../controllers/adminlogin.controllers");
// const adminValidation = require("../validations/admin.validations")


const router = express.Router();


router.post("/admin-login",adminloginControllers.adminLogin);
router.post("/admin-profile",adminloginControllers.viewAdminProfile);






module.exports = router;