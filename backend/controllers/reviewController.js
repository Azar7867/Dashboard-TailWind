const Review = require("../models/Review");

// GET
const getReviews = async (req, res) => {
  const reviews = await Review.find();
  res.json(reviews);
};

// POST (ADD REVIEW)
const addReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: "Review deleted ✅" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getReviews,
  addReview,
  deleteReview,
  updateReview,
};