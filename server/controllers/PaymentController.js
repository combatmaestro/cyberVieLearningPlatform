const Order = require("../models/Order");
const User = require("../models/User");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const Razorpay = require("razorpay");

module.exports.getDetails = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ userId: req.user._id });

  return res.status(200).json({
    success: true,
    data: orders,
  });
});

module.exports.createOrder = catchAsyncErrors(async (req, res, next) => {
  // var instance = new Razorpay({
  //   //test account
  //   key_id: "rzp_test_CgdmDRRo4iUWV4",
  //   key_secret: "ImalM7IBSpoUGvJ3nemuzt3l",
  // });
  var instance = new Razorpay({
    // live account
    key_id: "rzp_live_4xxvndbtEpTQKN",
    key_secret: "1KVxhFpM8Yv1xUZ18BoQXlve",
  });

  var options = {
    amount: req.body.total * 100, // amount in the smallest currency unit
    currency: "INR",
    payment_capture: 1,
  };

  await instance.orders.create(options, async function (err, razorOrder) {
    if (err) {
      return next(new ErrorHandler("Payment error", 400));
    }

    const order = await Order.create({
      userId: req.user._id,
      razorpayOrderID: razorOrder.id,
      pricepaid: req.body.total,
      status: "pending",
    });

    return res.status(200).json({
      success: true,
      data: order,
    });
  });
});

module.exports.confirmOrder = async (req, res) => {
  console.log("confirming order and marking it as success");
  try {
    const order = await Order.findOneAndUpdate(
      { razorpayOrderID: req.body.payload.payment.entity.order_id },
      {
        $set: {
          status: "success",
          razorpayPaymentID: req.body.payload.payment.entity.id,
        },
      },
      { new: true }
    );

    console.log(req.body.payload.payment.entity);

    if (!order) {
      return res.status(400).json({
        success: false,
        message: "cannot confirm",
      });
    }

    const user = await User.findByIdAndUpdate(
      order.userId,
      { $set: { tier: "paid" } },
      { new: true }
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "cannot confirm",
    });
  }
};

module.exports.failOrder = async (req, res) => {
  console.log("order failed");
  try {
    const order = await Order.findOneAndUpdate(
      { razorpayOrderID: req.body.payload.payment.entity.order_id },
      {
        $set: {
          status: "failed",
          razorpayPaymentID: req.body.payload.payment.entity.id,
        },
      },
      { new: true }
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "cannot confirm",
    });
  }
};

module.exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  await Order.findOneAndDelete({ razorpayOrderID: req.query.oid });

  return res.status(200).json({
    success: true,
  });
});

//admin all order

module.exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({})
    .populate("userId", "email")
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    data: orders,
  });
});
