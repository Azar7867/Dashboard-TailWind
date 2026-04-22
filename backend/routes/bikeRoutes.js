const express = require("express");
const {
  getBikes,
  addBike,
  deleteBike,
  updateBike,
} = require("../controllers/bikeController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// 🔐 PROTECTED ROUTES
router.get("/", verifyToken, getBikes);
router.post("/", verifyToken, addBike);
router.delete("/:id", verifyToken, deleteBike);
router.put("/:id", verifyToken, updateBike);

module.exports = router;