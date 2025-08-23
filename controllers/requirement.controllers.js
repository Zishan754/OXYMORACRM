const requirementModel = require("../models/requirement.models");

const notificationModel = require("../models/notification.models");
const { StatusCodes } = require("http-status-codes");

// module.exports.addRequirement= async (req, res) => {
//   try {
//     const {
//       requirement,
//       employeeId,
//       sendBy: sendBy,
//       adminComment,
      
//     } = req.body;

//     const attachment = req.file ? req.file.filename : "";

//     const newEntry = await requirementModel.create({
//       requirement,
//       attachment,
//       employeeId,
//       sendBy: sendBy,
//       adminComment: ""
//     });

//     res.status(200).json({
//       message: "Requirement Add Successfully",
//       success: true,
//       data: newEntry,
//     });
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };



module.exports.addRequirement = async (req, res) => {
  try {
    const {
      requirement,
      employeeId,
      sendBy,
      adminComment,
      deadline,

    } = req.body;

    const attachment = req.file ? req.file.filename : "";

    const newEntry = await requirementModel.create({
      requirement,
      attachment,
      employeeId,
      sendBy,
      adminComment: "",
      deadline,
    });

    //  Requirement save hote hi Admin notification create kar do
    await notificationModel.create({
      message: "New requirement submitted",
      admin: true,        // ye notification admin ke liye h
      type: "requirement",
      isRead: false,
    });

    res.status(200).json({
      message: "Requirement Add Successfully",
      success: true,
      data: newEntry,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


module.exports.viewRequirementTableEmployee = async (req, res) => {
  try {
    const { sendBy } = req.body;
    const requirement = await requirementModel.find({ sendBy }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: requirement,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



module.exports.viewRequirementTableAdmin = async (req, res) => {
  try {
    const viewData = await requirementModel.find().sort({ createdAt: -1 });

    if (viewData.length > 0) {
      res.status(200).json({
        message: "Requirement request view successfully",
        success: true,
        error: false,
        data: viewData,
      });
    } else {
      res.json({
        message: "No Requirement found",
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




module.exports.updateAdminComment = async (req, res) => {
  try {
    const { id, adminComment } = req.body;

    const existing = await requirementModel.findById(id);

    if (!existing) {
      return res.status(404).json({ success: false, message: "Requirement not found" });
    }

    // Prevent double commenting
    if (existing.adminComment && existing.adminComment.trim() !== "") {
      return res.status(400).json({ success: false, message: "Comment already exists" });
    }

    existing.adminComment = adminComment;
    await existing.save();

    res.status(200).json({ success: true, message: "Comment updated", data: existing });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

