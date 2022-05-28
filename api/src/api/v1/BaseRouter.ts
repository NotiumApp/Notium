import { auth as AuthRoutes } from "./modules/Auth";
import { note as NoteRoutes } from "./modules/Note";
import { Router } from "express";
import { isAuthenticated } from "./middlewares/isAuthenticated";

//Base router for all categories
export const apiV1 = Router();

apiV1.get("/", (req, res) => {
  res.json({ success: true, message: "Notium" });
});

apiV1.use("/auth", AuthRoutes);
apiV1.use("/note", isAuthenticated, NoteRoutes);
