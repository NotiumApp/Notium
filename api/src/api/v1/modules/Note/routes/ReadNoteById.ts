import { Router } from "express";
import { prisma } from '../../../db/index'

//Reads a specific note
export const ReadNoteById = () => {
  const router = Router();

  router.get("/", async (req, res) => {
    const { noteId } = req.body;

    const note = await prisma.note.findFirst({
      where: {
        id: noteId,
      },
    });

    if (!note) {
      return res.json({ success: false, message: "That note doesn't exist!" });
    }

    res.json({ success: true, note: note });
  });

  return router;
};
