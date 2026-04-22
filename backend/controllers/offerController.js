const Car = require("../models/Car");

// APPLY OFFER
const applyOffer = async (req, res) => {
  try {
    const { carId, offer } = req.body;

    if (offer < 0 || offer > 100) {
      return res.status(400).json({
        success: false,
        message: "Offer must be between 0 and 100",
      });
    }

    const car = await Car.findByIdAndUpdate(
      carId,
      { offer },
      { new: true }
    );

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    res.json({
      success: true,
      message: "Offer applied",
      data: car,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET OFFERS
const getOffers = async (req, res) => {
  try {
    const cars = await Car.find({ offer: { $gt: 0 } });

    res.json({
      success: true,
      count: cars.length,
      data: cars,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE OFFER
const updateOffer = async (req, res) => {
  try {
    const { offer } = req.body;

    if (offer < 0 || offer > 100) {
      return res.status(400).json({
        success: false,
        message: "Offer must be between 0 and 100",
      });
    }

    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { offer },
      { new: true }
    );

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    res.json({
      success: true,
      message: "Offer updated",
      data: car,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE OFFER
const deleteOffer = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(
      req.params.id,
      { offer: 0 },
      { new: true }
    );

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    res.json({
      success: true,
      message: "Offer removed",
      data: car,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  applyOffer,
  getOffers,
  updateOffer,
  deleteOffer,
};