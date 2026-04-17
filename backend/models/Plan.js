import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Plan", planSchema);