import { Router } from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated";
import { CreateNote } from "./routes/CreateNote";
import { ReadAllNotes } from "./routes/ReadAllNotes";
import { ReadNoteById } from "./routes/ReadNoteById";
import { UpdateNoteById } from "./routes/UpdateNoteById";

export const note = Router();

//Handles all the CRUD operations for note-related operations
note.use("/create", CreateNote());
note.use("/read", ReadNoteById());
note.use("/read/all", ReadAllNotes());
note.use("/update", UpdateNoteById());
