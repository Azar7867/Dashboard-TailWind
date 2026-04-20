import Notification from "../models/Notification.js";

// ➕ CREATE
export const createNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json(err);
  }
};

// 📥 GET ALL
export const getNotifications = async (req, res) => {
  const data = await Notification.find().sort({ createdAt: -1 });
  res.json(data);
};

// ❌ DELETE ONE
export const deleteNotification = async (req, res) => {
  await Notification.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
};

// 🧹 CLEAR ALL
export const clearNotifications = async (req, res) => {
  await Notification.deleteMany();
  res.json({ message: "Cleared" });
};