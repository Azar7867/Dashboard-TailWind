import mongoose from "mongoose";

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
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);