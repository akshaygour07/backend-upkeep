import express from "express";
import { verifyToken } from "../middlewares/tokenVerifier.js";
import { registerUser, loginUser, getUserById, updateUser, deleteUser } from "./controller.js";

const userRoutes = express.Router();

// Public routes
userRoutes.post("/register", registerUser);
userRoutes.post("/login", loginUser);

// Protected routes
userRoutes.get("/user-details", verifyToken, getUserById);
userRoutes.put("/user-update", verifyToken, updateUser);
userRoutes.delete("/user-delete", verifyToken, deleteUser);

export default userRoutes;
