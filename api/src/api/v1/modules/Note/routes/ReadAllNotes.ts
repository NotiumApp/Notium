import { Router } from "express";
import { prisma } from "../../../db/index";

//Reads a specific note
export const ReadNoteById = () => {
  const router = Router();

  router.get("/", async (req, res) => {
    const notes = await prisma.note.findMany({});

    if (!notes) {
      res.json({ success: false, message: "There are currently no notes" });
    }

    res.json({ success: true, notes: notes });
  });

  return router;
};
