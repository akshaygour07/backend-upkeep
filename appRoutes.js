import express from "express";
import userRoutes from "./src/users/routes.js";
import notesRoutes from "./src/notes/routes.js";

const appRoutes = express.Router();

appRoutes.use("/users", userRoutes); //api/v1/users
appRoutes.use("/notes", notesRoutes); //api/v1/notes

export default appRoutes;
