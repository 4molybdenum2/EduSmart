import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const signUp = async (req: Request, res: Response) => {
  if (!req.cookies?.token) {
    const { name, email, password, isStudent, tokenId } = req.body;
    const exists = await User.findOne({ email });
    if (!exists) {
      if (!tokenId) {
        const hash = await bcrypt.hash(password, 10);
        const user = new User({
          email,
          name,
          password: hash,
          // TODO: isStudent
          isStudent: true,
        });
        await user.save();

        const token = jwt.sign(
          {
            id: user._id,
            email,
            name,
            isStudent,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          expires,
        });
        return res.json({ message: "Successfully signed up!" });
      } else {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        const ticket = await client.verifyIdToken({
          idToken: tokenId,
          audience: process.env.CLIENT_ID,
        });
        const payload = ticket.getPayload();
        console.log(payload);
        const user = new User({
          email: payload.email,
          name: payload.name,
          googleId: payload.sub,
          isStudent,
        });
        await user.save();

        const token = jwt.sign(
          {
            id: user._id,
            email: payload.email,
            name: payload.name,
            isStudent,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );

        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          expires,
        });

        return res.json({ message: "Successfully signed up!" });
      }
    }
    return res.status(409).json({ error: "User already exists" });
  }
  return res.json({ message: "You are already logged in" });
};

export const login = async (req: Request, res: Response) => {
  if (!req.cookies?.token) {
    const { email, password, tokenId } = req.body;
    if (email && (password || tokenId)) {
      const user = await User.findOne({ email });

      if (user) {
        if (tokenId) {
          const client = new OAuth2Client(process.env.CLIENT_ID);
          const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.CLIENT_ID,
          });
          const userId = ticket.getPayload().sub;

          const token = jwt.sign(
            {
              id: user._id,
              email,
              name: user.name,
              googleId: userId,
              isStudent: user.isStudent,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "1d",
            }
          );

          const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
          res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires,
          });

          return res.json({ message: "Successfully logged in!" });
        } else {
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            const token = jwt.sign(
              {
                id: user._id,
                email,
                name: user.name,
                isStudent: user.isStudent,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: "1d",
              }
            );

            const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
            res.cookie("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              expires,
            });

            return res.json({ message: "Successfully logged in!" });
          }
          return res.status(400).json({ error: "Incorrect credentials" });
        }
      }
    }
    return res.status(400).json({ error: "Incorrect credentials" });
  }
  return res.json({ message: "You are already logged in" });
};

export const logout = async (req: Request, res: Response) => {
  if (req.cookies?.token) {
    res.clearCookie("token");
    return res.json({ message: "Logged out" });
  }
  return res.json({ error: "You are not logged in" });
};
