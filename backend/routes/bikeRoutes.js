import express from "express";
import { getBikes, addBike, deleteBike, updateBike } from "../controllers/bikeController.js";

const router = express.Router();

router.get("/", getBikes);
router.post("/", addBike);
router.delete("/:id", deleteBike);
router.put("/:id", updateBike);

export default router;