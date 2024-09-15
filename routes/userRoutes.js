import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
const userRoutes = Router();

// CRUD routes
userRoutes.get("/", getUsers); // Read all
userRoutes.post("/create", createUser); // Create
userRoutes.get("/:id", getUserById); // Read one
userRoutes.put("/update/:id", updateUser); // Update
userRoutes.delete("/delete/:id", deleteUser); // Delete

export default userRoutes;
