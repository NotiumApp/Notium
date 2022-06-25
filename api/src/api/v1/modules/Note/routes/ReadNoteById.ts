import { Router } from "express";
import { prisma } from "../../../db/index";

//Reads a specific note
export const ReadNoteById = () => {
  const router = Router();

  router.post("/", async (req, res) => {
    const { noteId } = req.body;

    console.log(noteId);

    const note = await prisma.note.findFirst({
      where: {
        id: noteId,
        userUid: res.locals.user.uid,
      },
    });

    if (!note) {
      res.json({ success: false, message: "That note doesn't exist!" });
    }

    res.json({ success: true, note: note });
  });

  return router;
};
