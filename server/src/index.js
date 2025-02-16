import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import flashcardRoutes from "./routes/flashcards.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Check if MongoDB URI is provided
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌ MongoDB URI is missing! Check your .env file.");
  process.exit(1);
}

// Connect to MongoDB with proper logging
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Successfully connected to MongoDB"))
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  });

// Log MongoDB connection status
mongoose.connection.on("connected", () =>
  console.log("🟢 MongoDB is connected")
);
mongoose.connection.on("error", (err) =>
  console.error("🔴 MongoDB connection error:", err.message)
);
mongoose.connection.on("disconnected", () =>
  console.warn("🟡 MongoDB is disconnected")
);

// Default route for root URL
app.get("/", (req, res) => {
  res.send("Welcome to the Alfred Task API! 🚀");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/flashcards", flashcardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
