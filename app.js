import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

// Load environment variables from .env
dotenv.config();

// Initialize Express
const app = express();

// Connect to MongoDB
mongoose.connect(process.env.DB_URI);

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
