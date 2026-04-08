import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: String,
  bike: String,
  rating: Number,
  review: String,
  time: String,
  avatar: String,
});

export default mongoose.model("Review", reviewSchema);