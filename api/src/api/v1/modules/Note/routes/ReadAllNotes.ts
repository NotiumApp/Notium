import { Note } from "@prisma/client";
import { Router } from "express";
import { prisma } from "../../../db/index";

let go = 0;

async function recursivelyGetNotes(note: any): Promise<any> {
  if (!note) {
    return;
  }

  const notes = await prisma.note.findFirst({
    where: {
      // userUid: res.locals.user.uid,
      id: note.id,
      userUid: "y9JG1p18zGREdnnKSvkuLdO68Go1",
    },
    include: {
      children: true,
    },
  });

  // console.log("notes", notes);

  let toReturn = notes;
  // const children = notes.children;
  // toReturn.children = [];

  // notes.children.map((child: any, i) => {

  for (const child in toReturn.children) {
    const childNotes = await recursivelyGetNotes(toReturn.children[child]);
    // console.log(notes.id, "childNotes", childNotes);
    // console.log("i come first", notes.id, go);
    if (childNotes) {
      toReturn.children[child] = childNotes;
      // console.log("cry", notes.id, toReturn.children);
    }
  }
  // });

  // console.log("woowow", toReturn);

  return toReturn;
}

//Reads a specific note
export const ReadAllNotes = () => {
  const router = Router();
  //was post but changed to get
  router.get("/", async (req, res) => {
    try {
      const notes = await prisma.note.findMany({
        where: {
          // userUid: res.locals.user.uid,
          userUid: "y9JG1p18zGREdnnKSvkuLdO68Go1",
        },
        include: {
          children: true,
        },
      });
      // recursivelyGetNotes(notes[3]).then((result) => {
      //   console.log(JSON.stringify(result, null, 4));
      // });

      for (const noteIndex in notes) {
        notes[noteIndex] = await recursivelyGetNotes(notes[noteIndex]);
      }

      console.log(JSON.stringify(notes, null, 4));

      if (!notes) {
        res.json({ success: false, message: "There are currently no notes" });
      } else {
        res.json({ success: true, notes: notes });
      }
    } catch (err) {
      console.log("error has occurred in ReadAllNotes!", err);
      res.status(500).send(err);
    }
  });

  return router;
};
