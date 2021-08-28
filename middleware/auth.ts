import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies?.token) {
    type Token = {
      id: string;
      isStudent: boolean;
    };
    try {
      const { id, isStudent } = jwt.verify(
        req.cookies.token,
        process.env.JWT_SECRET
      ) as Token;

      if (id && isStudent != undefined) {
        res.locals.id = id;
        res.locals.isStudent = isStudent;
        next();
      }

      return res.status(403).json({ error: "Invalid token" });
    } catch (error) {
      return res.status(403).json({ error: "Invalid token" });
    }
  }
  return res.status(403).json({ error: "You are not logged in" });
};

export const signToken = (data: any, res: Response) => {
  const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: "1d" });

  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires,
  });
};
