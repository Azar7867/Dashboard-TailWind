// import express from "express";
// import { getBikes, addBike, deleteBike, updateBike } from "../controllers/bikeController.js";

// const router = express.Router();

// router.get("/", getBikes);
// router.post("/", addBike);
// router.delete("/:id", deleteBike);
// router.put("/:id", updateBike);

// export default router;

import express from "express";
import {
  getBikes,
  addBike,
  deleteBike,
  updateBike,
} from "../controllers/bikeController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔐 PROTECTED ROUTES
router.get("/", verifyToken, getBikes);
router.post("/", verifyToken, addBike);
router.delete("/:id", verifyToken, deleteBike);
router.put("/:id", verifyToken, updateBike);

export default router;