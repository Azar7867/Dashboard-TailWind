const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  user: String,
  bike: String,
  rating: Number,
  review: String,
  time: String,
  avatar: String,
});

module.exports = mongoose.model("Review", reviewSchema);