import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../util/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const result = await db
      .collection("emails")
      .doc(req.body.email)
      .set({ email: req.body.email });

    res.status(200).send("User added successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
