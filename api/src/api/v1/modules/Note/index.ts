import { Router } from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { CreateNote } from "./routes/CreateNote";

export const note = Router();

//Handles all the CRUD operations for note-related operations
note.use("/create", isAuthenticated, CreateNote());
