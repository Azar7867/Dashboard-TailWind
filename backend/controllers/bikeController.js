const Bike = require("../models/Bike");

// GET ALL BIKES
const getBikes = async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.json(bikes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD BIKE
const addBike = async (req, res) => {
  try {
    const bike = new Bike(req.body);
    await bike.save();
    res.status(201).json(bike);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE BIKE
const deleteBike = async (req, res) => {
  try {
    const bike = await Bike.findByIdAndDelete(req.params.id);

    if (!bike) {
      return res.status(404).json({ message: "Bike not found" });
    }

    res.json({ message: "Bike deleted ✅" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE BIKE
const updateBike = async (req, res) => {
  try {
    const bike = await Bike.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!bike) {
      return res.status(404).json({ message: "Bike not found" });
    }

    res.json(bike);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getBikes,
  addBike,
  deleteBike,
  updateBike,
};