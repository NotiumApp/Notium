import { Router } from "express";
import { prisma } from "../../../db/index";

//Update a specific note
export const UpdateNoteById = () => {
  const router = Router();

  router.put("/", async (req, res) => {
    const { noteId, noteBody } = req.body;

    console.log(noteId);

    const note = await prisma.note.updateMany({
      where: {
        id: noteId,
        userUid: res.locals.user.uid,
      },

      data: {
        body: noteBody,
      },
    });

    if (!note) {
      res.json({ success: false, message: "That note doesn't exist!" });
    }

    res.json({ success: true, note: note });
  });

  return router;
};
