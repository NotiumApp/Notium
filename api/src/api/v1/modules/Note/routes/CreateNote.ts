import { Router } from "express";
import { checkAndCreateUser } from "../../../../../util/checkAndCreateUser";
import { prisma } from "../../../db";

//Creates a new note
export const CreateNote = () => {
  const router = Router();

  router.post("/", async (req, res) => {
    try {
      console.log(res.locals.user.uid, "iamhere");

      const { success, message } = await checkAndCreateUser(
        res.locals.user.uid
      );

      if (!success) {
        throw message;
      }

      const note = await prisma.note.create({
        data: {
          title: "Untitled Note",
          body: "Start typing here with [Markdown](https://www.markdownguide.org/)!",
          userUid: res.locals.user.uid,
          parentId: req.body.parentId || null,
        },
      });

      if (!note) {
        res
          .status(500)
          .json({ success: false, message: "Failed to create note" });
      } else {
        res.json({ success: true, note: note });
      }
    } catch (err) {
      console.log("error has occurred in CreateNote!", err);
      res.status(500).send(err);
    }
  });

  return router;
};
