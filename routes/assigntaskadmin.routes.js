const express = require('express');
const assigntaskadminControllers = require("../controllers/assigntaskadmin.controllers");
const { fileUpload } = require("../middlewares/fileUpload")



const router = express.Router();

router.post("/assign-task-admin", fileUpload.single("attachment"), assigntaskadminControllers.assignTaskAdmin);
router.post("/view-assign-task-admin",assigntaskadminControllers.viewTasksAdmin);
router.post("/view-assign-task-employee",assigntaskadminControllers.viewTaskEmployee);

router.post("/assign-task-tl", fileUpload.single("attachment"), assigntaskadminControllers.assignTaskTL);
router.post("/view-task-by-tl", assigntaskadminControllers.viewTasksByTL);




router.post("/update-task-progress", assigntaskadminControllers.updateTaskProgress);


module.exports = router;