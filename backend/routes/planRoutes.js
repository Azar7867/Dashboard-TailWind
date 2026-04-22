const express = require("express");
const {
  createPlan,
  getPlans,
  updatePlan,
  deletePlan,
} = require("../controllers/planController");

const router = express.Router();

router.post("/", createPlan);      // Add plan
router.get("/", getPlans);         // Get all plans
router.put("/:id", updatePlan);    // Update
router.delete("/:id", deletePlan); // Delete

module.exports = router;