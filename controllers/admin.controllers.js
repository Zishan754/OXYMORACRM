const adminModel = require('../models/admin.models')
const employeeModel = require('../models/employee.models')
const StatusCodes = require('http-status-codes');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



//  add employee 
module.exports.addEmployee = async (req, res) => {
  try {
    const { email, password, id, role, industry } = req.body;

    //  Check if email already exists
    const findEmployee = await adminModel.findOne({ email });
    if (findEmployee) {
      return res.json({
        status: StatusCodes.BAD_REQUEST,
        success: false,
        message: "email already exist"
      });
    }

    //  Check if ID already exists
    const findId = await adminModel.findOne({ id });
    if (findId) {
      return res.json({
        status: StatusCodes.BAD_REQUEST,
        success: false,
        message: "Employee ID already exists"
      });
    }

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(password, saltRounds);

    if (req.file == undefined) {
      const employeeData = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        designation: req.body.designation,
        project: req.body.project,
        dob: req.body.dob,
        contact: req.body.contact,
        alternate: req.body.alternate,
        address: req.body.address,
        gender: req.body.gender,
        password: hashPassword,
        role: role || "Employee",
        industry: industry || "",


      };

      const addEmployee = await adminModel.create(employeeData);
      await addEmployee.save();

      if (addEmployee) {
        return res.json({
          status: StatusCodes.OK,
          success: true,
          message: "Employee Add success without image",
          data: addEmployee
        });
      }

    } else {
      const fileName = req.file.filename;
      const employeeData = {
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        designation: req.body.designation,
        project: req.body.project,
        dob: req.body.dob,
        contact: req.body.contact,
        alternate: req.body.alternate,
        address: req.body.address,
        gender: req.body.gender,
        password: hashPassword,
        role: role || "Employee",
        industry: industry || "",
        profileImage: fileName
      };

      const addEmployee = await adminModel.create(employeeData);
      await addEmployee.save();

      if (addEmployee) {
        return res.json({
          status: StatusCodes.OK,
          success: true,
          message: "Employee Add with image",
          data: addEmployee
        });
      }
    }

  } catch (err) {
    return res.json({
      status: StatusCodes.BAD_REQUEST,
      success: false,
      message: err.message
    });
  }
};





// view employee 

 module.exports.viewEmployee = async (req,res) => {
  try {
    let SITE_URL = `http://localhost:3004`;

    let viewData = await adminModel.find().sort({ createdAt: -1 });

    if (viewData.length > 0) {
      viewData = viewData.map((element) => {
        if (element.profileImage) {
          let obj = {
            ...element.toObject(),
            profileImage: `${SITE_URL}/uploads/${element.profileImage}`,
          };
          return obj;
        } else {
          return element.toObject();
        }
      });

      res.status(200).json({
        message: "Employee view successfully",
        success: true,
        error: false,
        data: viewData,
      });
    } else {
      res.json({
        message: "No data found",
        error: true,
        success: false,
      });
    }
  } catch (err) {
    res.json({
      status: 400,
      success: false,
      message: err.message,
    });
  }
};


 // Delete employee

module.exports.deleteEmployee = async (req, res) => {
  try {
    const employeeFind = await adminModel.findOne({ _id: req.body._id });

    if (employeeFind) {
      const deleteEmployee = await adminModel.deleteOne({ _id: req.body._id });

      return res.json({
        status: 200,
        success: true,
        error: false,
        message: "Employee deleted successfully"
      });
    } else {
      return res.json({
        status: 400,
        success: false,
        error: true,
        message: "Employee not found"
      });
    }
  } catch (err) {
    return res.json({
      status: 400,
      success: false,
      error: true,
      message: "Something went wrong while deleting employee"
    });
  }
};







// Edit employee with id and email validation

module.exports.editEmployee = async (req, res) => {
  try {
    const findEmployee = await adminModel.findOne({ _id: req.body._id });

    if (!findEmployee) {
      return res.json({
        status: 404,
        success: false,
        message: "Employee not found",
      });
    }

    //  Check if 'id' already exists for another employee
    const idExists = await adminModel.findOne({
      id: req.body.id,
      _id: { $ne: req.body._id } // exclude current employee
    });

    if (idExists) {
      return res.json({
        status: 409,
        success: false,
        message: "Employee ID already exists",
      });
    }

    //  Check if 'email' already exists for another employee
    const emailExists = await adminModel.findOne({
      email: req.body.email,
      _id: { $ne: req.body._id }
    });

    if (emailExists) {
      return res.json({
        status: 409,
        success: false,
        message: "Email already exists",
      });
    }

    //  Password hashing if provided
    let hashedPassword = findEmployee.password;

    if (req.body.password && req.body.password.trim() !== "") {
      hashedPassword = await bcrypt.hash(req.body.password, 10);
    }

    const employeeData = {
      id: req.body.id,
      name: req.body.name,
      email: req.body.email,
      designation: req.body.designation,
      project: req.body.project,
      dob: req.body.dob,
      contact: req.body.contact,
      alternate: req.body.alternate,
      address: req.body.address,
      gender: req.body.gender,
      role: req.body.role,
      industry: req.body.industry,
      password: hashedPassword,
    };

    if (req.file !== undefined) {
      employeeData.profileImage = req.file.filename;
    }

    const editEmployee = await adminModel.updateOne(
      { _id: req.body._id },
      employeeData
    );

    if (editEmployee.modifiedCount > 0) {
      return res.json({
        status: 200,
        success: true,
        message: "Employee updated successfully",
        data: editEmployee,
      });
    } else {
      return res.json({
        status: 200,
        success: false,
        message: "Employee not updated",
      });
    }

  } catch (err) {
    return res.json({
      status: 400,
      success: false,
      message: err.message,
    });
  }
};




//  Check Employee ID availability
module.exports.checkEmployeeId = async (req, res) => {
  try {
    const { employeeId } = req.body;

    if (!employeeId) {
      return res.status(400).json({
        exists: false,
        success: false,
        message: "Employee ID is required",
      });
    }

    // adminModel hi use karna hai kyunki addEmployee, viewEmployee sab me wahi use ho raha hai
    const existing = await adminModel.findOne({ id: employeeId });

    if (existing) {
      return res.json({ exists: true, success: true, message: "Employee ID already exists" });
    } else {
      return res.json({ exists: false, success: true, message: "Employee ID is available" });
    }

  } catch (err) {
    return res.status(500).json({
      exists: false,
      success: false,
      message: "Error checking Employee ID",
      error: err.message
    });
  }
};
