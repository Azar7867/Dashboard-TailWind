const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  month: String,
  sales: Number,
});

module.exports = mongoose.model("Sales", salesSchema);