const User = require("../models/User");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/sendToken");
const { OAuth2Client } = require("google-auth-library");
const { findByIdAndUpdate } = require("../models/User");
const CLIENT_ID =
  "257899612719-9jsfnkbb5i5kgp6r34754vdlmjcdi6jb.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);
const sendEmail = require("../utils/sendEmail");
const welcomeTemplate = require("../utils/mailTemplate");

module.exports.authenticate = async (req, res, next) => {
  try {
    let body = req.body;
    const token = body.token;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const { name, email, picture } = ticket.getPayload();
    let user = await User.findOne({ email: email });
    if (user) {
      await sendToken(user, 200, res);
    } else {
      user = await User.create({
        email,
        name,
      });
      user.avatar.url = picture;
      await user.save();
      // await sendEmail({
      //   //sending welcome email
      //   email: email,
      //   html: welcomeTemplate,
      //   subject: "Welcome to Cybervie",
      // });
      // await sendEmail({
      //   //sending admin email
      //   email: "venkatesh.mainani@cybervie.com",
      //   html: `${name} with email ${email} has joined the portal today`,
      //   subject: "New Registration in the portal",
      // });
      await sendToken(user, 200, res);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.demo = () => {
  return res.status(200).json({
    success: true,
    data: "hi",
  });
}
module.exports.getDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  return res.status(200).json({
    success: true,
    data: user,
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

module.exports.update = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    mobile: req.body.mobile,
  };
  const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  return res.status(200).json({
    success: true,
    data: user,
  });
});

module.exports.leaderboard = catchAsyncErrors(async (req, res, next) => {
  const page = req.body.page;
  const skip = 10 * (page - 1);

  const total = await User.countDocuments({});
  const userList = await User.find({})
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
  const AllUsers = await User.find({}).sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    data: AllUsers,
  });
});

module.exports.editUser = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.query;
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  return res.status(200).json({
    success: true,
    data: user,
  });
});
