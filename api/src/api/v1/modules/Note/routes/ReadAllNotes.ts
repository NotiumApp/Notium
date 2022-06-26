import { Router } from "express";
import { prisma } from "../../../db/index";

//Reads a specific note
export const ReadAllNotes = () => {
  const router = Router();

  router.post("/", async (req, res) => {
    try {
      const notes = await prisma.note.findMany({
        where: {
          userUid: res.locals.user.uid,
        },
      });

      if (!notes) {
        res.json({ success: false, message: "There are currently no notes" });
      }

      res.json({ success: true, notes: notes });
    } catch (err) {
      console.log("error has occurred in ReadAllNotes!", err);
      res.status(500).send(err);
    }
  });

  return router;
};
