const express = require("express");
const {
  getMonthlySales,
  createMonthlySales,
} = require("../controllers/salesController");

const router = express.Router();

router.get("/", getMonthlySales);
router.post("/", createMonthlySales); // ✅ NEW

module.exports = router;