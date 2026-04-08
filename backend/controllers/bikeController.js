import Bike from "../models/Bike.js";

// GET
export const getBikes = async (req, res) => {
  const bikes = await Bike.find();
  res.json(bikes);
};

// POST (ADD BIKE)
export const addBike = async (req, res) => {
  try {
    const bike = new Bike(req.body);
    await bike.save();
    res.status(201).json(bike);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteBike = async (req, res) => {
  try {
    await Bike.findByIdAndDelete(req.params.id);
    res.json({ message: "Bike deleted ✅" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBike = async (req, res) => {
  try {
    const bike = await Bike.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(bike);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};