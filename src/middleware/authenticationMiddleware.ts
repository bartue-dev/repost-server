import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth.js";
import type { NextFunction, Request, Response } from "express";

export const verifyAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers)
  });

  if (!session || !session.user) {
    return res.status(401).json({
      error: "Unauthorized user"
    })
  }

  next();
}