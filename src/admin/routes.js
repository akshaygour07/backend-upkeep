import express from "express";
import { verifyToken } from "../middlewares/tokenVerifier.js";
import { getAllUsers } from "./controller.js";

const adminRoutes = express.Router()

adminRoutes.get("/all-user", verifyToken, getAllUsers)

export default adminRoutes;