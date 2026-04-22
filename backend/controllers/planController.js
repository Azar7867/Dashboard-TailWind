const Plan = require("../models/Plan");

// ➕ CREATE PLAN
const createPlan = async (req, res) => {
  try {
    const plan = await Plan.create(req.body);
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📥 GET ALL PLANS
const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find().sort({ createdAt: -1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✏️ UPDATE PLAN
const updatePlan = async (req, res) => {
  try {
    const plan = await Plan.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ❌ DELETE PLAN
const deletePlan = async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);
    res.json({ message: "Plan deleted ✅" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  createPlan,
  getPlans,
  updatePlan,
  deletePlan,
};