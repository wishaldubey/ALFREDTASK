import express from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// ========================
// ✅ Register Route
// ========================
router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").trim().isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;
      console.log("🔍 Incoming Registration Request:", {
        name,
        email,
        password,
      });

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email is already in use" });
      }

      // ❌ Remove manual password hashing
      const user = new User({ name, email, password });
      await user.save(); // Hashing will be handled in the model

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      console.log("🛠 Generated JWT Token:", token);

      console.log("✅ User Registered Successfully:", user);
      return res
        .status(201)
        .json({ message: "User registered successfully", token });
    } catch (error) {
      console.error("❌ Registration Error:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
);

// ========================
// ✅ Login Route (Fixed)
// ========================
router.post(
  "/login",
  [
    body("email").trim().isEmail().withMessage("Invalid email"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      console.log("🔍 Incoming Login Request:", { email, password });

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        console.log("❌ User not found:", email);
        return res.status(400).json({ message: "Invalid credentials" });
      }

      console.log("✅ User found:", user);

      // Debug: Log password before comparing
      console.log("🔍 Incoming Password:", password.trim());
      console.log("🔐 Hashed Password in DB:", user.password);

      // Compare password
      const isMatch = await bcrypt.compare(password.trim(), user.password);
      console.log("🔄 Password Match Status:", isMatch);

      if (!isMatch) {
        console.log("❌ Password mismatch for:", email);
        return res.status(400).json({ message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      console.log("🛠 Generated JWT Token:", token);
      res.json({
        token,
        user: { userId: user._id, name: user.name, email: user.email },
      });
    } catch (error) {
      console.error("❌ Login Error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

export default router;
