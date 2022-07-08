import { Note } from "@prisma/client";
import { Router } from "express";
import { prisma } from "../../../db/index";

export async function recursivelyGetNotes(
  note: any,
  userUid: string
): Promise<any> {
  if (!note) {
    return;
  }

  const notes = await prisma.note.findFirst({
    where: {
      userUid,
      id: note.id,
    },
    include: {
      children: true,
    },
  });

  let toReturn = notes;

  for (const child in toReturn.children) {
    const childNotes = await recursivelyGetNotes(
      toReturn.children[child],
      userUid
    );
    if (childNotes) {
      toReturn.children[child] = childNotes;
    }
  }

  return toReturn;
}

//Reads a specific note
export const ReadAllNotes = () => {
  const router = Router();
  router.post("/", async (req, res) => {
    try {
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
        res.json({ success: false, message: "There are currently no notes" });
      } else {
        res.json({ success: true, notes: notes, allNotes: notes });
      }
    } catch (err) {
      console.log("error has occurred in ReadAllNotes!", err);
      res.status(500).send(err);
    }
  });

  return router;
};
