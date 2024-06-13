const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const Batch = require("../models/Batch");
const nodemailer = require("nodemailer");
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
  
  const modules = await Batch.find({}).select('title description startDate endDate fee discountedFee')

  return res.status(200).json({
    success: true,
    data: modules,
  })
});

module.exports.batchUpdate = catchAsyncErrors(async (req, res, next) => {


  const newBatchData = {
    title: req.body.title,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    fee: req.body.fee,
    discountedFee: req.body.discountedFee
  }

  const module = await Batch.findByIdAndUpdate(req.query.id, newBatchData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })

  return res.status(200).json({
    success: true,
    message: 'Batch updated Success',
    data: module,
  })
})

module.exports.enroll = catchAsyncErrors(async (req, res, next) => {
  const { studentName, phoneNumber, module , email } = req.body;
  console.log("Enroll request received:", req.body);

  if (!studentName || !phoneNumber || !module) {
    console.log("Missing required fields");
    return next(new ErrorHandler("Please provide all required fields", 400));
  }

  try {
    try {
      console.log("Sending email...");
  
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "info@cybervie.com",
          pass: "rtgp rsls upgz zctc"
        },
      });
  
      let mailOptions = {
        from: "info@cybervie.com",
        to: "info@cybervie.com", 
        subject: "Course Enrollment Request",
        html: `${studentName} with phone number ${phoneNumber} and ${email} has requested to enroll for course ${module.title} today.`,
      };
      console.log("Email sent0");
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log("error is-> " + error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } catch (error) {
      console.error("Failed to send email:", error);
      return next(new ErrorHandler("Failed to send enrollment email", 500));
    }
    
    return res.status(200).json({
      success: true,
      message: "Enrollment request created",
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    return next(new ErrorHandler("Failed to send enrollment email", 500));
  }
});