import { Router } from "express";
import { prisma } from "../../../db";
import { recursivelyGetNotes } from "./ReadAllNotes";

//Creates a new note
export const DeleteNote = () => {
  const router = Router();

  router.post("/", async (req, res) => {
    try {
      const result = await prisma.note.deleteMany({
        where: {
          id: req.body.id,
          userUid: res.locals.user.uid,
        },
      });

      let notes = await prisma.note.findMany({
        where: {
          userUid: res.locals.user.uid,
        },
        include: {
          children: true,
        },
      });

      for (const noteIndex in notes) {
        notes[noteIndex] = await recursivelyGetNotes(
          notes[noteIndex],
          res.locals.user.uid
        );
      }

      notes = notes.filter((note) => !note.parentId);

      console.log(JSON.stringify(notes));

      if (!notes) {
        res.json({
          success: false,
          message: "There are currently no notes after deletion",
        });
      } else {
        res.json({ success: true, notes: notes });
      }
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Failed to delete note" });

      console.log("Error has occurred in DeleteNote!", err);
    }
  });

  return router;
};
