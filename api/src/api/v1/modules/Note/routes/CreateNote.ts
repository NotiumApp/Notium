import { Router } from "express";

//Creates a new note
export const CreateNote = () => {
  const router = Router();

  router.get("/", async (req, res) => {
    console.log(res.locals.user);
  });

  return router;
};
