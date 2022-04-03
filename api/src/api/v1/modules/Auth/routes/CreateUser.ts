import { prisma } from "../../../db";
import { Router } from "express";
import FirebaseAdmin from "firebase-admin";

//Creates a new user
export const CreateUser = () => {
  const router = Router();

  router.post("/", async (req, res) => {
    // res.send("HAHAHA FUNNY LMAO XD");
    const { authToken } = req.body;
    try {
      const user = await FirebaseAdmin.auth().verifyIdToken(authToken);
      const prismaResult = await prisma.user.findUnique({
        where: {
          uid: user.uid,
        },
      });

      if (prismaResult) {
        res.status(409).send("User already created");
      } else {
        await prisma.user.create({
          data: {
            uid: user.uid,
          },
        });

        res.send("Registered!");
      }
    } catch (err) {
      res.status(500).send(err);
    }
  });

  return router;
};
