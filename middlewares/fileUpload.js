// const multer = require("multer");
// const path = require('path');
// const imageStorage = multer.diskStorage({
//   // destination to store image 
//   destination: 'uploads',
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + '_' + Date.now()
//   + path.extname(file.originalname))
//   }
// });
// module.exports.fileUpload = multer({
//   storage:imageStorage
// });



// middlewares/fileUpload.js

const multer = require("multer");
const path = require("path");

const fileStorage = multer.diskStorage({
  // Set the uploads folder
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  // Set unique file name
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = file.fieldname + "_" + Date.now() + ext;
    cb(null, uniqueName);
  },
});

// File type filter (image/pdf/excel/video only)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/vnd.ms-excel", // .xls
    "video/mp4",
    "video/quicktime", // .mov
    "video/x-msvideo", // .avi
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

module.exports.fileUpload = multer({
  storage: fileStorage,
  fileFilter,
});
