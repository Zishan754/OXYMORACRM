
const projectModel = require('../models/project.models');
const StatusCodes = require('http-status-codes');

// ADD PROJECT
module.exports.addProject = async (req, res) => {
  try {
    const { project_name, description } = req.body;

    const findProject = await projectModel.findOne({ project_name });
    if (findProject) {
      return res.json({
        status: StatusCodes.BAD_REQUEST,
        success: false,
        message: "Project name already exists",
      });
    }

    const projectData = {
      project_name,
      description: description || "",
    };

    // If file is uploaded
    if (req.file) {
      projectData.attachment = req.file.filename;
    }

    const addProject = await projectModel.create(projectData);
    await addProject.save();

    return res.json({
      status: StatusCodes.OK,
      success: true,
      message: "Project added successfully",
      data: addProject,
    });

  } catch (err) {
    return res.json({
      status: StatusCodes.BAD_REQUEST,
      success: false,
      message: err.message,
    });
  }
};

// VIEW PROJECT
module.exports.viewProject = async (req, res) => {
  try {
    const viewData = await projectModel.find().sort({ createdAt: -1 });

    if (viewData.length > 0) {
      res.status(200).json({
        message: "Projects view successfully",
        success: true,
        error: false,
        data: viewData,
      });
    } else {
      res.json({
        message: "No Projects found",
        error: true,
        success: false,
      });
    }
  } catch (err) {
    res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: err.message,
    });
  }
};

// DELETE PROJECT
module.exports.deleteProject = async (req, res) => {
  try {
    const findProject = await projectModel.findOne({ _id: req.body._id });
    if (findProject) {
      const projectDelete = await projectModel.deleteOne({ _id: req.body._id });
      return res.json({
        status: StatusCodes.OK,
        success: true,
        message: "Project deleted successfully",
        data: projectDelete
      });
    } else {
      return res.json({
        status: StatusCodes.BAD_REQUEST,
        success: false,
        message: "Project not found",
      });
    }
  } catch (err) {
    return res.json({
      status: StatusCodes.BAD_REQUEST,
      success: false,
      message: err.message,
    });
  }
};



module.exports.editProject = async (req, res) => {
  try {
    const { _id, project_name, description } = req.body;

    if (!_id || !project_name) {
      return res.json({
        status: 400,
        success: false,
        message: "Project Name is required",
      });
    }

    const project = await projectModel.findById(_id);
    if (!project) {
      return res.json({
        status: 404,
        success: false,
        message: "Project not found",
      });
    }

    // Check if project name already exists for a different project
    const existingProject = await projectModel.findOne({
      project_name: project_name.trim(),
      _id: { $ne: _id }, // exclude current project
    });

    if (existingProject) {
      return res.json({
        status: 409,
        success: false,
        message: "Project name already exists",
      });
    }

    // Update values
    project.project_name = project_name.trim();
    project.description = description || "";

    if (req.file) {
      project.attachment = req.file.filename;
    }

    await project.save();

    return res.json({
      status: 200,
      success: true,
      message: "Project updated successfully",
      data: project,
    });

  } catch (err) {
    return res.json({
      status: 400,
      success: false,
      message: err.message,
    });
  }
};
