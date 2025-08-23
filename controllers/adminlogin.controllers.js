

const adminloginModel = require('../models/adminlogin.models');
const StatusCodes = require('http-status-codes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await adminloginModel.findOne({ email });

    if (!admin) {
      return res.json({
        status: StatusCodes.BAD_REQUEST,
        success: false,
        message: "Email does not exist",
      });
    }

    if (admin.role_id !== 1) {
      return res.json({
        status: StatusCodes.FORBIDDEN,
        success: false,
        message: "Not authorized to login as admin",
      });
    }

    const isValidPassword = await bcrypt.compare(password, admin.password);
    if (!isValidPassword) {
      return res.json({
        status: StatusCodes.UNAUTHORIZED,
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        adminId: admin._id,
        adminEmail: admin.email,
        role: admin.role
      },
      "zishan",
      { expiresIn: "7d" }
    );

    return res.json({
      status: StatusCodes.OK,
      success: true,
      message: "Admin login successful",
      token: token,
      data: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      }
    });

  } catch (err) {
    return res.json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      success: false,
      message: err.message,
    });
  }
};



module.exports.viewAdminProfile = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
        success: false,
        error: true,
      });
    }

    // Only select the required fields
    const adminData = await adminloginModel.findOne({ email }).select("name email password role");

    if (adminData) {
      res.status(200).json({
        message: "Admin profile fetched successfully",
        success: true,
        error: false,
        data: adminData,
      });
    } else {
      res.status(404).json({
        message: "Admin not found",
        success: false,
        error: true,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
      success: false,
      error: true,
    });
  }
};


