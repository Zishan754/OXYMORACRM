const adminModel = require('../models/admin.models')
const employeeModel = require('../models/employee.models');
const StatusCodes = require('http-status-codes');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");





//  Login Employee or Employee TL
// module.exports.loginEmployee = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     //  Check email
//     const viewEmployee = await adminModel.findOne({ email });
//     if (!viewEmployee) {
//       return res.json({
//         status: 400,
//         success: false,
//         message: "Email does not exist",
//       });
//     }

//     //  Compare password
//     const isValidPassword = await bcrypt.compare(password, viewEmployee.password);
//     if (!isValidPassword) {
//       return res.json({
//         status: 400,
//         success: false,
//         message: "Invalid password",
//       });
//     }

//     //  Success response with role
//     return res.json({
//       status: 200,
//       success: true,
//       message: "Employee logged in successfully",
//       data: {
//         _id: viewEmployee._id,
//         email: viewEmployee.email,
//         name: viewEmployee.name,
//         role: viewEmployee.role,
//         profileImage: viewEmployee.profileImage,
//         industry: viewEmployee.industry,
//       },
//     });
//   } catch (err) {
//     return res.json({
//       status: 400,
//       success: false,
//       message: err.message,
//     });
//   }
// };


//  Login Employee or Employee TL
module.exports.loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    //  Check email
    const viewEmployee = await adminModel.findOne({ email }); //  yaha galat lag raha, employee login ke liye `employeeModel` use hona chahiye
    if (!viewEmployee) {
      return res.json({
        status: 400,
        success: false,
        message: "Email does not exist",
      });
    }

    //  Compare password
    const isValidPassword = await bcrypt.compare(password, viewEmployee.password);
    if (!isValidPassword) {
      return res.json({
        status: 400,
        success: false,
        message: "Invalid password",
      });
    }

    //   JWT token generate
    const token = jwt.sign(
      { id: viewEmployee._id, role: viewEmployee.role },
      "mySecretKey",       //  isko .env file me rakho (process.env.JWT_SECRET)
      { expiresIn: "1d" }  // 1 din tak valid
    );

    //  Success response with role + token
    return res.json({
      status: 200,
      success: true,
      message: "Employee logged in successfully",
      token: token,   //  yeh front-end me milega
      data: {
        _id: viewEmployee._id,
        email: viewEmployee.email,
        name: viewEmployee.name,
        role: viewEmployee.role,
        profileImage: viewEmployee.profileImage,
        industry: viewEmployee.industry,
      },
    });
  } catch (err) {
    return res.json({
      status: 400,
      success: false,
      message: err.message,
    });
  }
};




module.exports.addEmployeeTimesheet = async (req, res) => {
  try {
    const {
      project_name,
      employee_name,
      login_time,
      logout_time,
      hours,
      task,
      next_day_task,
      suggestions,
      employeeId,
    } = req.body;

    //  get file name if uploaded
    const attachment = req.file ? req.file.filename : "";

    const newEntry = await employeeModel.create({
      project_name,
      employee_name,
      login_time,
      logout_time,
      hours,
      task,
      next_day_task,
      attachment, // store file name here
      suggestions,
      employeeId,
    });

    res.status(200).json({
      message: "Timesheet added",
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


// specific id ke trough data show 
module.exports.viewEmployeeTimesheetTable = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required",
      });
    }

    const viewData = await employeeModel.find({ employeeId: id }).sort({ createdAt: -1 });

    if (viewData.length > 0) {
      res.status(200).json({
        message: "Employee timesheet fetched successfully",
        success: true,
        error: false,
        data: viewData,
      });
    } else {
      res.json({
        message: "No timesheet data found for this employee",
        error: true,
        success: false,
      });
    }
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


