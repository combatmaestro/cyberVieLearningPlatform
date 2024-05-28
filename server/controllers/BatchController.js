const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const Batch = require("../models/Batch");
const sendEmail = require("../utils/sendEmail");
//->  /batch/admin/save
module.exports.save = catchAsyncErrors(async (req, res, next) => {
  console.log("req1111111111111111111111111",req);
  const batch = await Batch.create(req.body);

  return res.status(200).json({
    success: true,
    message: "Batch created Success",
    data: batch,
  });
});
module.exports.getAllBatches = catchAsyncErrors(async (req, res, next) => {
  
  const modules = await Batch.find({}).select('title description startDate endDate fee')

  return res.status(200).json({
    success: true,
    data: modules,
  })
});


module.exports.enroll = catchAsyncErrors(async (req, res, next) => {
  const { studentName, phoneNumber, module } = req.body;
  console.log("Enroll request received:", req.body);

  if (!studentName || !phoneNumber || !module) {
    console.log("Missing required fields");
    return next(new ErrorHandler("Please provide all required fields", 400));
  }

  try {
    console.log("Sending email...");
    await sendEmail({
      email: "adarshsahu2510@gmail.com",
      html: `${studentName} with phone number ${phoneNumber} has requested to enroll for course ${module.title} today.`,
      subject: "Course Enrollment Request",
    });

    console.log("Email sent successfully");
    return res.status(200).json({
      success: true,
      message: "Enrollment request created",
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    return next(new ErrorHandler("Failed to send enrollment email", 500));
  }
});