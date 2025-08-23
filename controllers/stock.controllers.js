
const stock = require('../models/stock.models');
const Notification = require('../models/notification.models');
const StatusCodes = require('http-status-codes');



// add Stock on admin

// module.exports.addAdminStock = async (req, res) => {
//   try {
//     const {
//       addBy,
//       name,
//       category,
//       packages,
//       total_reel,
//       total_qty,
//       used_qty,
//       time,
//     } = req.body;

//     // Create new stock entry
//     const newStock = await stock.create({
//       addBy,
//       name,
//       category,
//       packages,
//       total_reel,
//       total_qty,
//       used_qty,
//       time,
//     });

//     // Optional: create notification
//     // await Notification.create({
//     //   message: `New Stock Assigned: ${name}`,
//     //   stockId: newStock._id,
//     // });

//     res.status(200).json({
//       message: "Stock Added Successfully",
//       success: true,
//       data: newStock,
//     });
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };


module.exports.addAdminStock = async (req, res) => {
  try {
    const {
      addBy,
      name,
      category,
      packages,
      total_reel,
      total_qty,
      used_qty,
      time,
    } = req.body;

    // ✅ Check if product already exists
    const findStock = await stock.findOne({ name });
    if (findStock) {
      return res.status(400).json({
        success: false,
        message: "Stock name already exists",
      });
    }

    // ✅ Create new stock entry
    const newStock = await stock.create({
      addBy,
      name,
      category,
      packages,
      total_reel,
      total_qty,
      used_qty,
      time,
    });

    // ✅ Optional: create notification
    // await Notification.create({
    //   message: `New Stock Assigned: ${name}`,
    //   stockId: newStock._id,
    // });

    res.status(200).json({
      message: "Stock Added Successfully",
      success: true,
      data: newStock,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};




//  view Stock on Admin table + employee table

module.exports.viewAdminStock = async (req, res) => {
  try {
    const viewData = await stock.find().sort({ createdAt: -1 });

    if (viewData.length > 0) {
      res.status(200).json({
        message: "Stock view successfully",
        success: true,
        error: false,
        data: viewData,
      });
    } else {
      res.json({
        message: "No Stock found",
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



// delete Stock on Admin table 

module.exports.deleteStock = async (req, res) => {
  try {
    const findStock = await stock.findOne({ _id: req.body._id });
    if (findStock) {
      const stockDelete = await stock.deleteOne({ _id: req.body._id });
      return res.json({
        status: StatusCodes.OK,
        success: true,
        message: "Stock deleted successfully",
        data: stockDelete
      });
    } else {
      return res.json({
        status: StatusCodes.BAD_REQUEST,
        success: false,
        message: "Stock not found",
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



// employee add stock

module.exports.addEmployeeStock = async (req, res) => {
  try {
    const name = req.body.name;

    // Check if product already exists
    const findStock = await stock.findOne({ name });
    if (findStock) {
      return res.json({
        status: StatusCodes.BAD_REQUEST,
        success: false,
        message: "Stock name already exists"
      });
    }

    // Add product (image and cat_id removed)
    const stockData = {
      addBy: req.body.addBy,
      name: req.body.name,
      category: req.body.category,
      packages: req.body.packages,
      total_reel: req.body.total_reel,
      total_qty: req.body.total_qty,
      used_qty: req.body.used_qty,

    };

    const addStock = await stock.create(stockData);
    await addStock.save();

    return res.json({
      status: StatusCodes.OK,
      success: true,
      message: "Stock added successfully",
      data: addStock
    });

  } catch (err) {
    return res.json({
      status: StatusCodes.BAD_REQUEST,
      success: false,
      message: err.message
    });
  }
};




//  employee edit stock table 

module.exports.editStock = async (req, res) => {
  try {
    
    const findStock = await stock.findOne({ _id: req.body._id });

    if (!findStock) {
  return res.json({
    status: StatusCodes.NOT_FOUND,
    success: false,
    message: "Stock not found",
  });
}

// Update fields
findStock.addBy = req.body.addBy;
findStock.name = req.body.name;
findStock.category = req.body.category;
findStock.packages = req.body.packages;
findStock.total_reel = req.body.total_reel;
findStock.total_qty = req.body.total_qty;
findStock.used_qty = req.body.used_qty;

// 👇 Push to updateHistory
findStock.updateHistory.push({
  updatedBy: req.body.updatedBy, // 👈 send this from frontend
  updatedAt: new Date()
});

// Save
await findStock.save();

return res.json({
  status: StatusCodes.OK,
  success: true,
  message: "Stock updated successfully",
  data: findStock,
});
  } catch (err) {
    return res.json({
      status: StatusCodes.BAD_REQUEST,
      success: false,
      message: err.message,
    });
  }
};
