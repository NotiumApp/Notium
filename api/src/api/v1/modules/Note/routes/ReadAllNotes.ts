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

  notes.children.map((child: any, i) => {
    (async () => {
      const childNotes = await recursivelyGetNotes(child);
      // console.log(notes.id, "childNotes", childNotes);
      console.log("i come first", notes.id, go);
      if (childNotes) {
        toReturn.children[i] = childNotes;
        console.log("cry", notes.id, toReturn.children);
      }
    })();
  });

  console.log("woowow", toReturn);

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
      recursivelyGetNotes(notes[3]).then((result) => {
        console.log("result", result);
      });
      // console.log(ack);

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
