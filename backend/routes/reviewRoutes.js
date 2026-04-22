const express = require("express");
const {
  getReviews,
  addReview,
  deleteReview,
  updateReview,
} = require("../controllers/reviewController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/",verifyToken, getReviews);
router.post("/", verifyToken,addReview);
router.delete("/:id",verifyToken, deleteReview);
router.put("/:id",verifyToken, updateReview);

module.exports = router;