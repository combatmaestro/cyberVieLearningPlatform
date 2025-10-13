const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/sendToken");
const { OAuth2Client } = require("google-auth-library");
const nodemailer = require("nodemailer");
const { findByIdAndUpdate } = require("../models/User");
const EnterpriseLead = require("../models/EnterpriseLead"); // ✅ import model

const CLIENT_ID =
  "449086785583-9vop51gavcavffauj4v5jfmosfm2j988.apps.googleusercontent.com";
// const CLIENT_ID =
  // "257899612719-9jsfnkbb5i5kgp6r34754vdlmjcdi6jb.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
const sendEmail = require("../utils/sendEmail");
const welcomeTemplate = require("../utils/mailTemplate");
const leadsUsers = require("../models/register");
const { v4: uuidv4 } = require('uuid');
module.exports.authenticate = async (req, res, next) => {
  try {
    let body = req.body;
    const token = body.token;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const { name, email, picture } = ticket.getPayload();
    let user = await User.findOne({ email: email.toLowerCase() });
    var filteredUsers = {};
    if (user) {
      const token = user.getJwtToken();
      const filteredUser = specificfilterUserProperties(user);
      await sendToken(filteredUser, token, 200, res);
    } else {
      user = await User.create({
        "email" : email.toLowerCase(),
        name,
      });
      user.avatar.url = picture;
      await user.save();
      await sendEmail({
        //sending welcome email
        email: email,
        html: welcomeTemplate,
        subject: "Welcome to Cybervie",
      });
      await sendEmail({
        //sending admin email
        email: "info@cybervie.com",
        html: `${name} with email ${email} has joined the portal today`,
        subject: "New Registration in the portal",
      });
      const token = user.getJwtToken();
      const filteredUser = filterUserProperties(user);
      await sendToken(filteredUser, token, 200, res);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.getDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  var filteredUsers = {};
  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  } else {
    filteredUsers = specificfilterUserProperties(user);
  }

  return res.status(200).json({
    success: true,
    data: filteredUsers,
  });
});

module.exports.signout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("cybervie", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  return res.status(200).json({
    success: true,
    message: "User Signout Success",
  });
});

// module.exports.update = catchAsyncErrors(async (req, res, next) => {

//   const newUserData = {
//     name: req.body.name,
//     mobile: req.body.mobile,
//     education: req.body.education,
//     workingDomain: req.body.workingDomain,
//     experience: req.body.experience,
//     currentSalary: req.body.currentSalary,
//     expectedSalary: req.body.expectedSalary,
//     preferredLocation: req.body.preferredLocation,
//   };

//   if (req.body.mobile && req.body.currentSalary) {
//     try {
//       console.log("Sending email...");

//       let transporter = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//           user: "info@cybervie.com",
//           pass: "rtgp rsls upgz zctc",
//         },
//       });

//       let mailOptions = {
//         from: "info@cybervie.com",
//         to: "info@cybervie.com",
//         subject: "User Updated Profile Data",
//         html: `Name : ${req.body.name} , mobile : ${req.body.mobile} , education : ${req.body.education} , Working Domain : ${req.body.workingDomain} , Current Salary : ${req.body.currentSalary} , experience : ${req.body.experience}`,
//       };

//       transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//           console.log("error is-> " + error);
//         } else {
//           console.log("Updated User Data Email sent");
//           console.log("Email sent: " + info.response);
//         }
//       });
//       console.log("Updated User Data Email sent11");
//       console.log( req.user.mail)
//       let userMailOptions = {
//         from: "info@cybervie.com",
//         to: req.user.mail,
//         subject:
//           "Welcome to Cybervie CSEP Program – Your Journey to a Cybersecurity Career Begins Here!",
//         html: ` <div class="se-component se-image-container __se__float-center" contenteditable="false" style="width:100%;">
//         <figure style="margin: auto; width:100%;">
//           <img src="https://res.cloudinary.com/cybervie/image/upload/v1627302453/welcome%20mail/WhatsApp_Image_2021-07-26_at_17.52.06_tgpprx.jpg" alt="" data-rotate="" data-proportion="true" data-size="," data-align="center" data-percentage="auto,auto" data-file-name="WhatsApp_Image_2021-07-26_at_17.52.06_tgpprx.jpg" data-file-size="0" origin-size="1280,320" data-origin="," style="width:100%;" data-index="1">
//         </figure>
//       </div>

//       <h2><span style="box-sizing: border-box; -webkit-user-drag: none; overflow: visible; font-family: inherit; font-size: 14px; color: inherit; display: inline; vertical-align: baseline; margin: 0px; padding: 0px;"><br>
//       </span></h2>

//       <h2><span style="box-sizing: border-box; -webkit-user-drag: none; overflow: visible; font-family: inherit; font-size: 14px; color: inherit; display: inline; vertical-align: baseline; margin: 0px; padding: 0px;">Dear ${req.user.mail}</span></h2>

//       <p><br>
//       </p>Thank you for your interest in Cybervie's Certified Security Engineer Professional (CSEP) program. We are excited to help you transition smoothly into a rewarding career in cybersecurity.

//       <p>Based on your current experience and salary, our IT Career Counselor will be contacting you shortly. We believe that our advanced training program will be instrumental in your professional growth and success in the cybersecurity field.</p>

//       <!--<h2 style="text-align: justify; line-height: 1.15;"><span style="font-size: 14px;">​<br>-->
//       </span></h2>

//       <p>To discuss your eligibility and provide further details, our Career Counselor will be reaching out to you within the next 24 hours. We encourage you to take this opportunity to ask any questions you may have about the program and your potential career path.</p>
//       <p>Welcome to Cybervie, and we look forward to guiding you on your journey to becoming a Certified Security Engineer Professional.</p>

//       <p><strong>Cybervie Career Counseling Team</strong></p>
//       <p>Thank You.</p>`,
//       };
//       transporter.sendMail(userMailOptions, function (error, info) {
//         if (error) {
//           console.log("error is-> " + error);
//         } else {
//           console.log("Updated User Data Email sent222");
//           console.log("User Email sent: " + info.response);
//         }
//       });
//       console.log("Updated User Data Email sent333");
//     } catch (error) {
//       console.error("Failed to send email:", error);
//       return next(new ErrorHandler("Failed to send updated user email", 500));
//     }
//   }

//   const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false,
//   });

//   return res.status(200).json({
//     success: true,
//     data: user,
//   });
// });
module.exports.update = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    mobile: req.body.mobile,
    education: req.body.education,
    workingDomain: req.body.workingDomain,
    experience: req.body.experience,
    currentSalary: req.body.currentSalary,
    expectedSalary: req.body.expectedSalary,
    preferredLocation: req.body.preferredLocation,
  };

  if (req.body.mobile && req.body.currentSalary) {
    try {
      console.log("Sending emails...");

      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "info@cybervie.com",
          pass: "rtgp rsls upgz zctc",
        },
      });

      let adminMailOptions = {
        from: "info@cybervie.com",
        to: "info@cybervie.com",
        subject: "User Updated Profile Data",
        html: `Name : ${req.body.name}, mobile : ${req.body.mobile}, education : ${req.body.education}, Working Domain : ${req.body.workingDomain}, Current Salary : ${req.body.currentSalary}, experience : ${req.body.experience}`,
      };

      // let userMailOptions = {
      //   from: "info@cybervie.com",
      //   to: req.user.mail,
      //   subject: "Welcome to Cybervie CSEP Program – Your Journey to a Cybersecurity Career Begins Here!",
      //   html: `
      //     <div class="se-component se-image-container __se__float-center" contenteditable="false" style="width:100%;">
      //       <figure style="margin: auto; width:100%;">
      //         <img src="https://res.cloudinary.com/cybervie/image/upload/v1627302453/welcome%20mail/WhatsApp_Image_2021-07-26_at_17.52.06_tgpprx.jpg" alt="" style="width:100%;">
      //       </figure>
      //     </div>
      //     <h2>Dear ${req.user.mail}</h2>
      //     <p>Thank you for your interest in Cybervie's Certified Security Engineer Professional (CSEP) program. We are excited to help you transition smoothly into a rewarding career in cybersecurity.</p>
      //     <p>Based on your current experience and salary, our IT Career Counselor will be contacting you shortly. We believe that our advanced training program will be instrumental in your professional growth and success in the cybersecurity field.</p>
      //     <p>To discuss your eligibility and provide further details, our Career Counselor will be reaching out to you within the next 24 hours. We encourage you to take this opportunity to ask any questions you may have about the program and your potential career path.</p>
      //     <p>Welcome to Cybervie, and we look forward to guiding you on your journey to becoming a Certified Security Engineer Professional.</p>
      //     <p><strong>Cybervie Career Counseling Team</strong></p>
      //     <p>Thank You.</p>
      //   `,
      // };

      await Promise.all([
        transporter.sendMail(adminMailOptions),
        // transporter.sendMail(userMailOptions),
      ]);

      console.log("Emails sent successfully");
    } catch (error) {
      console.error("Failed to send emails:", error);
      return next(new ErrorHandler("Failed to send updated user email", 500));
    }
  }

  const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  var filteredUsers = {};
  if (user) {
    filteredUsers = specificfilterUserProperties(user);
  }
  return res.status(200).json({
    success: true,
    data: filteredUsers,
  });
});

module.exports.leaderboard = catchAsyncErrors(async (req, res, next) => {
  const { page = 1, search = "" } = req.body; // Add search query
  const skip = 10 * (page - 1);

  // Create a search condition
  const searchCondition = search
    ? { name: { $regex: search, $options: "i" } }
    : {};

  const total = await User.countDocuments(searchCondition); // Count total documents based on search condition
  const userList = await User.find(searchCondition)
    .sort({ marks: -1 })
    .limit(10)
    .skip(skip)
    .select("name avatar marks");
  const topperList = await User.find({})
    .sort({ marks: -1 })
    .limit(3)
    .select("name avatar marks");

  return res.status(200).json({
    success: true,
    data: {
      userList,
      topperList,
      total,
    },
  });
});

module.exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const allUsers = await User.find({}).sort({ createdAt: -1 });
  const filteredUsers = allUsers.map(specificfilterUserProperties);

  return res.status(200).json({
    success: true,
    data: filteredUsers,
  });
});

module.exports.editUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.query;
  console.log(req.body);

  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  console.log(updatedUser);
  const filteredUser = specificfilterUserProperties(updatedUser);

  // Check if the user exists in the leads table based on their email
  const userExistsInLeads = await leadsUsers.findOne({
    email: updatedUser.email,
  });

  // If the user exists in leadsUsers, update their tier in the leads table
  if (userExistsInLeads) {
    userExistsInLeads.tier = updatedUser.tier;
    await userExistsInLeads.save();
  }

  return res.status(200).json({
    success: true,
    data: filteredUser,
  });
});

module.exports.getTeachers = catchAsyncErrors(async (req, res, next) => {
  const allTeachers = await User.find({ role: "teacher" }).sort({
    createdAt: -1,
  });
  return res.status(200).json({
    success: true,
    data: allTeachers,
  });
});

module.exports.generateCertificate = catchAsyncErrors(async (req, res, next) =>{
  try {
    const { id } = req.params;

    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Update the user fields
    user.certificateRefId = uuidv4();
    user.certificateGenerated = true;
    user.certificateDate = new Date();

    // Save the updated user
    await user.save();

    // Respond with success
    res.status(200).json({
      success: true,
      message: 'Certificate generated successfully',
      user,
    });
  } catch (error) {
    console.error('Error generating certificate:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});

function filterUserProperties(user) {
  const objectToSend = {
    avatar: user.avatar,
    tier: user.tier,
    role: user.role,
    marks: user.marks,
    responses: user.responses,
    _id: user._id,
    email: user.email,
    name: user.name,
    batch: user.batch,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  if (user.labCreated !== undefined) {
    objectToSend.labCreated = user.labCreated;
  }

  return objectToSend;
}

function specificfilterUserProperties(user) {
  const objectToSend = {
    avatar: user.avatar,
    tier: user.tier,
    role: user.role,
    marks: user.marks,
    responses: user.responses,
    _id: user._id,
    email: user.email,
    name: user.name,
    batch: user.batch,
    education: user.education,
    currentSalary: user.currentSalary,
    expectedSalary: user.expectedSalary,
    preferredLocation: user.preferredLocation,
    mobile: user.mobile,
    workingDomain: user.workingDomain,
    experience: user.experience,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    certificateGenerated: user?.certificateGenerated,
    certificateDate : user?.certificateDate,
    certificateRefId : user?.certificateRefId
  };

  if (user.labCreated !== undefined) {
    objectToSend.labCreated = user.labCreated;
  }

  return objectToSend;
}
module.exports.enterpriseLeads = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, phone, message } = req.body;

    if (!name || !phone || !message) {
      return next(new ErrorHandler("All fields (name, phone, message) are required", 400));
    }

    // ✅ Save to MongoDB
    await EnterpriseLead.create({ name, phone, message });

    // ✅ Send notification email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "info@cybervie.com",
        pass: "rtgp rsls upgz zctc", // ⚠️ move to .env for security
      },
    });

    const mailOptions = {
      from: "info@cybervie.com",
      to: "info@cybervie.com",
      subject: "New Enterprise Lead Inquiry",
      html: `
        <h2>New Lead from Enterprise.AI Website</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong> ${message}</p>
        <p>Submitted on: ${new Date().toLocaleString()}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: "Lead submitted successfully. Our team will contact you shortly.",
    });
  } catch (error) {
    console.error("Error in enterpriseLeads:", error);
    return next(new ErrorHandler("Failed to submit lead. Try again later.", 500));
  }
});
