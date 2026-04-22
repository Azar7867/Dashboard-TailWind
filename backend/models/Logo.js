const mongoose = require("mongoose");

const logoSchema = new mongoose.Schema({
  url: String,
  public_id: String, // ✅ add this line
});

module.exports = mongoose.model("Logo", logoSchema);