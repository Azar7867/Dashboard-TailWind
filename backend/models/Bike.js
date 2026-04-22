const mongoose = require("mongoose");

const bikeSchema = new mongoose.Schema({
  name: String,
  price: String,
  insurance: String,
  tax: String,
  onroad: String,
  image: String,
});

module.exports = mongoose.model("Bike", bikeSchema);