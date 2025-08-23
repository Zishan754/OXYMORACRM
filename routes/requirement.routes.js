const express = require('express');
const requiremenetControllers = require("../controllers/requirement.controllers");
const { fileUpload } = require("../middlewares/fileUpload")


const router = express.Router();

router.post("/add-requirement", fileUpload.single("attachment"),requiremenetControllers.addRequirement);



router.post("/view-requirement-table-employee",requiremenetControllers.viewRequirementTableEmployee);

router.post("/view-requirement-table-admin",requiremenetControllers.viewRequirementTableAdmin);
router.post("/update-admin-comment", requiremenetControllers.updateAdminComment);







module.exports = router;