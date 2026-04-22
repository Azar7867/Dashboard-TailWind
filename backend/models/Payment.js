const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    planName: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "success",
    },
  }
);

module.exports = mongoose.model("Payment", paymentSchema);