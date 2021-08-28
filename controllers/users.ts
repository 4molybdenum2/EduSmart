import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { OAuth2Client } from "google-auth-library";
import User from "../models/User";
import { signToken } from "../utils/signToken";

export const signUp = async (req: Request, res: Response) => {
  if (!req.cookies?.token) {
    const { name, email, password, isStudent, tokenId } = req.body;
    const exists = await User.findOne({ email }).select("_id");
    if (!exists) {
      if (!tokenId) {
        const hash = await bcrypt.hash(password, 10);
        User.create({ email, name, password: hash, isStudent }, (e, user) => {
          if (e) {
            console.log(e);
            return res.status(500).json({ error: "Sign up Error" });
          }

          signToken({ id: user._id, name, isStudent }, res);
          return res.json({ message: "Successfully signed up!", id: user._id, isStudent });
        });
      } else {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        client.verifyIdToken(
          {
            idToken: tokenId,
            audience: process.env.CLIENT_ID,
          },
          (err, ticket) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ error: "Invalid Token" });
            }

            const payload = ticket.getPayload();
            User.create(
              {
                email: payload.email,
                name: payload.name,
                googleId: payload.sub,
                isStudent,
              },
              (e, user) => {
                if (e) {
                  console.log(e);
                  return res.status(500).json({ error: "Sign up Error" });
                }

                signToken({ id: user._id, name: payload.name, isStudent }, res);
                return res.json({ message: "Successfully signed up!", id: user._id, isStudent });
              }
            );
          }
        );
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
          client.verifyIdToken(
            {
              idToken: tokenId,
              audience: process.env.CLIENT_ID,
            },
            (err, _) => {
              if (err) {
                console.log(err);
                return res.status(500).json({ error: "Invalid Token" });
              }

              signToken(
                { id: user._id, name: user.name, isStudent: user.isStudent },
                res
              );
              return res.json({ message: "Successfully logged in!", id: user._id, isStudent: user.isStudent });
            }
          );
        } else {
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            signToken(
              { id: user._id, name: user.name, isStudent: user.isStudent },
              res
            );
            return res.json({ message: "Successfully logged in!", id: user._id, isStudent: user.isStudent });
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

export const enroll = async (req: Request, res: Response) => {
  if (res.locals.isStudent) {
    User.findByIdAndUpdate(
      res.locals.id,
      { $push: { courses: req.params.courseID } },
      (e) => {
        if (e) {
          console.log(e);
          return res.status(500).json({ error: "Enrollment Error" });
        }
        return res.json({ message: "Enrolled successfully" });
      }
    );
  }

  return res.status(403).json({ error: "UNAUTHORIZED" });
};

export const testResults = async (req: Request, res: Response) => {
  const results = await User
    .findById(res.locals.id)
    .select("testSubmissions -_id")
    .populate("testSubmissions.test", "title maxMarks");
  return res.json({ results });
};
