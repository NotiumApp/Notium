import { Router } from "express";
import { CreateUser } from "./routes/CreateUser";

export const auth = Router();

//Handles all the CRUD operations for user-related operations
auth.use("/create", CreateUser());
