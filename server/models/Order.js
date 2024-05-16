const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    razorpayOrderID: {
      type: String,
    },

    razorpayPaymentID: {
      type: String,
    },

    pricepaid: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["success", "pending", "failed"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
