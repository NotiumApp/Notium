import { Router } from "express";

//Creates a new note
export const CreateNote = () => {
  const router = Router();

  router.get("/", async (req, res) => {
    res.send("HAHAHA FUNNY LMAO XD");
  });

  return router;
};
