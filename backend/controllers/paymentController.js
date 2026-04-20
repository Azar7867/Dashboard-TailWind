import Payment from "../models/Payment.js";
import Notification from "../models/Notification.js";

// ➕ CREATE PAYMENT
export const createPayment = async (req, res) => {
  try {
    const payment = await Payment.create(req.body);

    const io = req.app.get("io");

    // ✅ SAVE NOTIFICATION IN DB
    const notification = await Notification.create({
      message: `Payment received for ${payment.planName} (₹${payment.amount})`,
    });

    // ✅ EMIT REAL-TIME (SEND DB DATA)
    io.emit("new-notification", notification);

    res.status(201).json(payment);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};