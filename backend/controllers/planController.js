import Plan from "../models/Plan.js";

// ➕ CREATE PLAN
export const createPlan = async (req, res) => {
  try {
    const plan = await Plan.create(req.body);
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📥 GET ALL PLANS
export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find().sort({ createdAt: -1 });
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✏️ UPDATE PLAN
export const updatePlan = async (req, res) => {
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
export const deletePlan = async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);
    res.json({ message: "Plan deleted ✅" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};