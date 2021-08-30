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
            return res.json({ error: "Sign up Error" });
          }

          const token = signToken({ id: user._id, name, isStudent });
          const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
          res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires,
          });

          return res.json({ id: user._id, name, isStudent });
        });
      } else {
        const client = new OAuth2Client(process.env.CLIENT_ID);
        try {
          const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.CLIENT_ID,
          });

          const { email: t_mail, name: t_name, sub } = ticket.getPayload();
          const user = await User.create({
            email: t_mail,
            name: t_name,
            googleId: sub,
            isStudent,
          });

          const token = signToken({ id: user._id, name: t_name, isStudent });
          const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
          res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            expires,
          });

          return res.json({ id: user._id, name: t_name, isStudent });
        } catch (e) {
          return res.json({ error: "Error occurred in Google Sign-up" });
        }
      }
    } else return res.json({ error: "User already exists" });
  } else return res.json({ message: "You are already logged in" });
};

export const login = async (req: Request, res: Response) => {
  if (!req.cookies?.token) {
    const { email, password, tokenId } = req.body;
    if (email && (password || tokenId)) {
      const user = await User.findOne({ email }).select(
        "name isStudent password"
      );

      if (user) {
        const { _id: id, name, isStudent } = user;
        if (tokenId) {
          const client = new OAuth2Client(process.env.CLIENT_ID);
          try {
            const ticket = await client.verifyIdToken({
              idToken: tokenId,
              audience: process.env.CLIENT_ID,
            });

            const token = signToken({ id, name, isStudent });
            const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
            res.cookie("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              expires,
            });

            return res.json({ id, name, isStudent });
          } catch (e) {
            return res.json({ error: "Error occurred in Google Sign-in" });
          }
        } else {
          const isMatch = await bcrypt.compare(password, user.password);
          if (isMatch) {
            const token = signToken({ id, name, isStudent });
            const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
            res.cookie("token", token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              expires,
            });

            return res.json({ id, name, isStudent });
          } else return res.json({ error: "Incorrect credentials" });
        }
      }
    } else return res.json({ error: "Incorrect credentials" });
  } else return res.json({ message: "You are already logged in" });
};

export const logout = async (req: Request, res: Response) => {
  if (req.cookies?.token) {
    res.clearCookie("token");
    return res.json({ message: "Logged out" });
  } else return res.json({ error: "You are not logged in" });
};

export const enroll = async (req: Request, res: Response) => {
  if (res.locals.isStudent) {
    User.findByIdAndUpdate(
      res.locals.id,
      { $push: { courses: req.params.courseID } },
      (e) => {
        if (e) {
          console.log(e);
          return res.json({ error: "Enrollment Error" });
        } else return res.json({ message: "Enrolled successfully" });
      }
    );
  } else return res.json({ error: "UNAUTHORIZED" });
};

export const unenroll = async (req: Request, res: Response) => {
  if (res.locals.isStudent) {
    User.findByIdAndUpdate(
      res.locals.id,
      { $pull: { courses: req.params.courseID } },
      (e) => {
        if (e) {
          console.log(e);
          return res.json({ error: "Unlink Error" });
        } else return res.json({ message: "Unlinked successfully" });
      }
    );
  } else return res.json({ error: "UNAUTHORIZED" });
};

export const testResults = async (req: Request, res: Response) => {
  User.findById(res.locals.id)
    .select("testSubmissions -_id")
    .populate("testSubmissions.test", "title maxMarks")
    .exec((e, results) => {
      if (e) {
        console.log(e);
        return res.json({ error: "Fetching Results Error" });
      } else return res.json(results);
    });
};

export const getSchedule = async (req: Request, res: Response) => {
  User.findById(res.locals.id)
    .select("courses -_id")
    .populate("courses", "schedule")
    .exec((e, courses) => {
      if (e) {
        console.log(e);
        return res.json({ error: "Fetching Course Error" });
      } else return res.json(courses);
    });
};
