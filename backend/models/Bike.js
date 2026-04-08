import mongoose from "mongoose";

const bikeSchema = new mongoose.Schema({
  name: String,
  price: String,
  insurance: String,
  tax: String,
  onroad: String,
  image: String,
});

export default mongoose.model("Bike", bikeSchema);