

const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controllers");
const { fileUpload } = require("../middlewares/fileUpload");

// Use multer middleware in add/edit routes
router.post("/add-project", fileUpload.single("attachment"), projectController.addProject);
router.post("/view-project", projectController.viewProject);
router.post("/delete-project", projectController.deleteProject);
router.post("/edit-project", fileUpload.single("attachment"), projectController.editProject);

module.exports = router;
