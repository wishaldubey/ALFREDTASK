import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";
import flashcardRoutes from "./routes/flashcards.js";

dotenv.config();

const app = express();

// ✅ Allow both local development and deployed frontend
const allowedOrigins = [
  "http://localhost:5173",  // Local Development
  "https://vishalalfredtask.vercel.app" // Production Frontend on Vercel
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error("❌ CORS Blocked Origin:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies & authentication headers
  })
);

// Middleware
app.use(express.json());

// ✅ Check if MongoDB URI is provided
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error("❌ MongoDB URI is missing! Check your .env file.");
  process.exit(1);
}

// ✅ Connect to MongoDB with proper logging
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Successfully connected to MongoDB"))
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  });

// ✅ Log MongoDB connection status
mongoose.connection.on("connected", () => console.log("🟢 MongoDB is connected"));
mongoose.connection.on("error", (err) => console.error("🔴 MongoDB connection error:", err.message));
mongoose.connection.on("disconnected", () => console.warn("🟡 MongoDB is disconnected"));

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Welcome to the Alfred Task API! 🚀");
});

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/flashcards", flashcardRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
