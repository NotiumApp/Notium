import { Request, Response, NextFunction } from "express";
import FirebaseAdmin from "firebase-admin";

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authToken } = req.body;
  try {
    const user = await FirebaseAdmin.auth().verifyIdToken(authToken);
    if (user) {
      res.locals.user = user;
      next();
    } else {
      throw "User does not exist (non-firebase-issue)";
    }
  } catch (err) {
    res.json({ success: false, message: "Not authenticated", err });
  }
};
