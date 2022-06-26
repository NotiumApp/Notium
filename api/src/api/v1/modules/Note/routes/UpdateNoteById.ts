import { Router } from "express";
import { prisma } from "../../../db/index";

//Update a specific note
export const UpdateNoteById = () => {
  const router = Router();

  router.put("/", async (req, res) => {
    try {
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
      } else {
        res.json({ success: true, note: note });
      }
    } catch (err) {
      console.log("error has occurred in UpdateNoteById!", err);
      res.status(500).send(err);
    }
  });

  return router;
};
