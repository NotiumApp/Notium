import { Router } from "express";
import { prisma } from "../../../db/index";
import { recursivelyGetNotes } from "./ReadAllNotes";

//Reads a specific note
export const ReadNoteById = () => {
  const router = Router();

  router.post("/", async (req, res) => {
    try {
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
      } else {
        // const recursivedNote = await recursivelyGetNotes(
        //   note,
        //   res.locals.user.uid
        // );
        // res.json({ success: true, note: recursivedNote });
        res.json({ success: true, note: note });
      }
    } catch (err) {
      console.log("error has occurred in ReadNoteById!", err);
      res.status(500).send(err);
    }
  });

  return router;
};
