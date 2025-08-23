// const suggestionsModel = require("../models/employeesuggestions.models");
// const StatusCodes = require("http-status-codes");

// // Suggestion Add API with file upload support

// // module.exports.addSuggestion = async (req, res) => {
// //   try {
// //     const { title, suggestion, message } = req.body;
// //     const file = req.file ? req.file.filename : null;

// //     const addSuggestion = await suggestionsModel.create({
// //       title,
// //       suggestion,
// //       message,
// //       file,
// //     });

// //     if (addSuggestion) {
// //       res.json({
// //         status: StatusCodes.OK,
// //         success: true,
// //         message: "Suggestion submitted successfully",
// //         data: addSuggestion,
// //       });
// //     } else {
// //       res.json({
// //         status: StatusCodes.BAD_REQUEST,
// //         success: false,
// //         message: "Suggestion submission failed",
// //       });
// //     }
// //   } catch (err) {
// //     res.json({
// //       status: StatusCodes.BAD_REQUEST,
// //       success: false,
// //       message: err.message,
// //     });
// //   }
// // };


// // Suggestion Add API with file upload support + employee details
// module.exports.addSuggestion = async (req, res) => {
//   try {
//     const { title, suggestion, message, employeeName, employeeId } = req.body;
//     const file = req.file ? req.file.filename : null;

//     const addSuggestion = await suggestionsModel.create({
//       title,
//       suggestion,
//       message,
//       file,
//       employeeName,
//       employeeId,
//     });

//     if (addSuggestion) {
//       res.json({
//         status: StatusCodes.OK,
//         success: true,
//         message: "Suggestion submitted successfully",
//         data: addSuggestion,
//       });
//     } else {
//       res.json({
//         status: StatusCodes.BAD_REQUEST,
//         success: false,
//         message: "Suggestion submission failed",
//       });
//     }
//   } catch (err) {
//     res.json({
//       status: StatusCodes.BAD_REQUEST,
//       success: false,
//       message: err.message,
//     });
//   }
// };
