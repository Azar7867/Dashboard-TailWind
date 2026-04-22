const Notification = require("../models/Notification");

// ➕ CREATE
const createNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json(err);
  }
};

// 📥 GET ALL
const getNotifications = async (req, res) => {
  const data = await Notification.find().sort({ createdAt: -1 });
  res.json(data);
};

// ❌ DELETE ONE
const deleteNotification = async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

// 🧹 CLEAR ALL
const clearNotifications = async (req, res) => {
  await Notification.deleteMany();
  res.json({ message: "Cleared" });
};
module.exports = {
  createNotification,
  getNotifications,
  deleteNotification,
  clearNotifications,
};