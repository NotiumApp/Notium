import { Router } from "express";
import { prisma } from "../../../db";

//Creates a new note
export const CreateNote = () => {
  const router = Router();

  router.post("/", async (req, res) => {
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
  });

  return router;
};
