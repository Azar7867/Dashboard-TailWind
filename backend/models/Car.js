const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    offer: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  }
);

module.exports = mongoose.model("Car", carSchema);