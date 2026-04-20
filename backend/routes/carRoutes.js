import express from "express";
import {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
  getCarsWithDiscount,
} from "../controllers/carController.js";

const router = express.Router();

// IMPORTANT: discount first
router.get("/discount/all", getCarsWithDiscount);
router.get("/discount/:id", getCarsWithDiscount);

router.post("/", createCar);
router.get("/", getCars);
router.get("/:id", getCarById);
router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

export default router;