const Sales = require("../models/Sales");

// 🔹 GET Monthly Sales
const getMonthlySales = async (req, res) => {
  try {
    const sales = await Sales.find();

    res.json({
      success: true,
      data: sales,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 🔹 POST Monthly Sales
const createMonthlySales = async (req, res) => {
  try {
    const { month, sales } = req.body;

    // ✅ Validation
    if (!month || sales == null) {
      return res.status(400).json({
        success: false,
        message: "Month and sales are required",
      });
    }

    const newSales = await Sales.create({
      month,
      sales,
    });

    res.status(201).json({
      success: true,
      message: "Monthly sales created successfully",
      data: newSales,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  getMonthlySales,
  createMonthlySales,
};