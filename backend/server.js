import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import bikeRoutes from "./routes/bikeRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import planRoutes from "./routes/planRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import { verifyToken } from "./middleware/authMiddleware.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/bikes", bikeRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/payments", paymentRoutes);
// app.get("/api/bikes", verifyToken, (req, res) => {
//   res.json(bikes);
// });
app.use("/api/reviews", reviewRoutes);
// fetch("http://localhost:5000/api/bikes")
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// import express from "express";
// import cors from "cors";

// const app = express();
// const PORT = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Dummy Database (Array)
// let users = [
//   { id: 1, name: "Azar", email: "azar@gmail.com" },
//   { id: 2, name: "John", email: "john@gmail.com" }
// ];

// // 👉 GET all users
// app.get("/users", (req, res) => {
//   res.json(users);
// });

// // 👉 GET single user
// app.get("/users/:id", (req, res) => {
//   const user = users.find(u => u.id === parseInt(req.params.id));

//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   res.json(user);
// });

// // 👉 CREATE user
// app.post("/users", (req, res) => {
//   const { name, email } = req.body;

//   if (!name || !email) {
//     return res.status(400).json({ message: "All fields required" });
//   }

//   const newUser = {
//     id: users.length + 1,
//     name,
//     email
//   };

//   users.push(newUser);
//   res.status(201).json(newUser);
// });

// // 👉 UPDATE user
// app.put("/users/:id", (req, res) => {
//   const user = users.find(u => u.id === parseInt(req.params.id));

//   if (!user) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   const { name, email } = req.body;

//   user.name = name || user.name;
//   user.email = email || user.email;

//   res.json(user);
// });

// // 👉 DELETE user
// app.delete("/users/:id", (req, res) => {
//   const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));

//   if (userIndex === -1) {
//     return res.status(404).json({ message: "User not found" });
//   }

//   users.splice(userIndex, 1);

//   res.json({ message: "User deleted successfully" });
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });