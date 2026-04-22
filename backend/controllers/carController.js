const Car = require("../models/Car");

// CREATE CAR
const createCar = async (req, res) => {
  try {
    const { name, model, price, description } = req.body;

    if (!name || !model || !price) {
      return res.status(400).json({
        success: false,
        message: "Name, model, and price are required",
      });
    }

    const car = await Car.create({ name, model, price, description });

    res.status(201).json({
      success: true,
      message: "Car created successfully",
      data: car,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET ALL CARS
const getCars = async (req, res) => {
  try {
    const cars = await Car.find();

    res.json({
      success: true,
      count: cars.length,
      data: cars,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET SINGLE CAR
const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    res.json({ success: true, data: car });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// UPDATE CAR
const updateCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    res.json({
      success: true,
      message: "Car updated",
      data: car,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE CAR
const deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    res.json({
      success: true,
      message: "Car deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET DISCOUNTED CARS
const getCarsWithDiscount = async (req, res) => {
  try {
    let cars;

    if (req.params.id) {
      const car = await Car.findById(req.params.id);
      if (!car) {
        return res.status(404).json({
          success: false,
          message: "Car not found",
        });
      }
      cars = [car];
    } else {
      cars = await Car.find();
    }

    const result = cars.map((car) => {
      const finalPrice =
        car.price - (car.price * car.offer) / 100;

      return {
        ...car._doc,
        originalPrice: car.price,
        offer: car.offer,
        finalPrice,
      };
    });

    res.json({
      success: true,
      data: req.params.id ? result[0] : result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
  getCarsWithDiscount,
};