import Bike from "../models/Bike.js";

// GET ALL BIKES
export const getBikes = async (req, res) => {
  try {
    const bikes = await Bike.find();
    res.json(bikes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ADD BIKE
export const addBike = async (req, res) => {
  try {
    const bike = new Bike(req.body);
    await bike.save();
    res.status(201).json(bike);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE BIKE
export const deleteBike = async (req, res) => {
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
export const updateBike = async (req, res) => {
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
