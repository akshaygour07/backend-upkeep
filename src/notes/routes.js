import express from "express";
import { verifyToken } from "../middlewares/tokenVerifier.js";
import { createNote } from "./controller.js";

const notesRoutes = express.Router();

notesRoutes.post("/create-notes", verifyToken, createNote);
notesRoutes.get("/get-notes", verifyToken);

export default notesRoutes;
