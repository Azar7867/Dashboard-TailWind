import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// REGISTER
// router.post("/register", async (req, res) => {
//   try {
//     if (!req.body) {
//       return res.status(400).json({ message: "Body is missing" });
//     }

//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields required" });
//     }

//     const hash = await bcrypt.hash(password, 10);

//     await User.create({ name, email, password: hash });

//     res.status(201).json({ message: "User registered" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body; //payload

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
      role: role || "user", // default user
    });

    res.status(201).json({ message: "User registered", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Body is missing" });
    }

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email & Password required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.role === "admin") {
      return res.status(403).json({
        message: "Admin must login from admin login page",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // const token = jwt.sign(
    //   { id: user._id },
    //   process.env.JWT_SECRET || "SECRET_KEY",
    //   { expiresIn: "1d" }
    // );
    const token = jwt.sign(
  { id: user._id },
  process.env.JWT_SECRET || "SECRET_KEY",
  { expiresIn: "30m" } // ⏱ 10 seconds
);

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password"); // 🔐 hide password

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// ADMIN LOGIN
router.post("/admin-login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check input
    if (!email || !password) {
      return res.status(400).json({ message: "Email & Password required" });
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // 🔥 Check role
    if (user.role !== "admin") {
      return res.status(403).json({ message: "Access denied (Not Admin)" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "SECRET_KEY",
      { expiresIn: "30m" }
    );

    res.json({
      message: "Admin login successful",
      token,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;
