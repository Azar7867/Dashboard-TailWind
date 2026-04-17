import express from "express";
import {
  createPlan,
  getPlans,
  updatePlan,
  deletePlan,
} from "../controllers/planController.js";

const router = express.Router();

router.post("/", createPlan);      // Add plan
router.get("/", getPlans);         // Get all plans
router.put("/:id", updatePlan);    // Update
router.delete("/:id", deletePlan); // Delete

export default router;