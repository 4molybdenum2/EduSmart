import { Request, Response } from "express";
import User from "../models/User";
import Course from "../models/Course";

export const getCourses = async (req: Request, res: Response) => {
  if (req.cookies?.token) {
    const userID = req.params.userID;
    const courses = await User.findById(userID)
      .select("courses -_id")
      .populate("course", "name professor");

    return res.json({ courses });
  }
  return res.json({ error: "You are not logged in" });
};

export const addCourse = async (req: Request, res: Response) => {
  if (req.cookies?.token) {
    const { courseName, schedule } = req.body;
    const userID = req.params.userID;

    // TODO: Get isStudent from cookie or frontend
    const isStudent = false;

    if (!isStudent) {
      Course.create(
        { name: courseName, professor: userID, schedule },
        (err, course) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: "Create Course Error" });
          }

          User.findByIdAndUpdate(
            userID,
            { $push: { courses: course._id } },
            (e, user) => {
              if (e) {
                console.log(e);
                return res.status(500).json({ error: "Create Course Error" });
              }
              return res.json({ message: "Course created successfully" });
            }
          );
        }
      );
    }

    return res.status(403).json({ error: "UNAUTHORIZED" });
  }
  return res.json({ error: "You are not logged in" });
};
