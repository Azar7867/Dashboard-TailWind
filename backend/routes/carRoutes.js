const express = require("express");
const {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
  getCarsWithDiscount,
} = require("../controllers/carController");

const router = express.Router();

// IMPORTANT: discount first
router.get("/discount/all", getCarsWithDiscount);
router.get("/discount/:id", getCarsWithDiscount);

router.post("/", createCar);
router.get("/", getCars);
router.get("/:id", getCarById);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

module.exports = router;