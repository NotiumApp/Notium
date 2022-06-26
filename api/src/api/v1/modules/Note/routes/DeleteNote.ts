import { Router } from "express";
import { prisma } from "../../../db";

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

      res.json({ success: true, result: "Deleted Note" });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Failed to delete note" });

      console.log("Error has occurred in DeleteNote!", err);
    }
  });

  return router;
};
