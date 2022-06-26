import { Router } from "express";
import { prisma } from "../../../db";

//Creates a new note
export const CreateNote = () => {
  const router = Router();

  router.post("/", async (req, res) => {
    try {
      console.log(res.locals.user.uid, "iamhere");
      const note = await prisma.note.create({
        data: {
          title: "Untitled Note",
          body: "Start typing here with [Markdown](https://www.markdownguide.org/)!",
          userUid: res.locals.user.uid,
        },
      });

      if (!note) {
        res
          .status(500)
          .json({ success: false, message: "Failed to create note" });
      }

      res.json({ success: true, note: note });
    } catch (err) {
      console.log("error has occurred in CreateNote!", err);
      res.status(500).send(err);
    }
  });

  return router;
};
