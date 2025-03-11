import express from "express";
import { verifyToken } from "../middlewares/tokenVerifier.js";
import { createNote, getNoteByUserId, updateNotes } from "./controller.js";

const notesRoutes = express.Router();

notesRoutes.post("/create-notes", verifyToken, createNote);
notesRoutes.get("/get-notes", verifyToken, getNoteByUserId);
// notesRoutes.get("/notes-with-user", verifyToken, getAllNotes)
notesRoutes.put("/update/:id", verifyToken, updateNotes)

export default notesRoutes;
