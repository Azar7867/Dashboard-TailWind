import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";

// ROUTES
import authRoutes from "./routes/auth.js";
import bikeRoutes from "./routes/bikeRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import offerRoutes from "./routes/offerRoutes.js";
import carRoutes from "./routes/carRoutes.js";
// MIDDLEWARE
import { verifyToken } from "./middleware/authMiddleware.js";

dotenv.config();

// 🔌 CONNECT DB
connectDB();

// 🚀 INIT APP
const app = express();
const server = http.createServer(app);

// 🔌 SOCKET.IO SETUP
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST"],
  },
});

// 🔥 MAKE SOCKET GLOBAL
app.set("io", io);

// 🟢 SOCKET CONNECTION LOG
io.on("connection", (socket) => {
  console.log("🟢 User Connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 User Disconnected:", socket.id);
  });
});

// 🧱 MIDDLEWARE
app.use(cors());
app.use(express.json());

// 📦 ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/bikes", bikeRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/offers", offerRoutes);
// 🏠 ROOT
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ❌ GLOBAL ERROR HANDLER (OPTIONAL BUT GOOD)
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.message);
  res.status(500).json({ message: "Server Error" });
});

// 🚀 START SERVER (IMPORTANT: use server.listen)
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});