import { Request, Response } from "express";
import User from "../models/User";
import Course from "../models/Course";

export const getCourses = async (req: Request, res: Response) => {
  User.findById(res.locals.id)
    .select("courses -_id")
    .populate("course", "name professor")
    .exec((e, courses) => {
      if (e) {
        console.log(e);
        return res.json({ error: "Fetching Course Error" });
      }

      return res.json(courses);
    });
};

export const addCourse = async (req: Request, res: Response) => {
  const { name, schedule } = req.body;

  if (!res.locals.isStudent) {
    Course.create(
      { name, professor: res.locals.id, schedule },
      (err, course) => {
        if (err) {
          console.log(err);
          return res.json({ error: "Create Course Error" });
        }

        User.findByIdAndUpdate(
          res.locals.id,
          { $push: { courses: course._id } },
          (e) => {
            if (e) {
              console.log(e);
              return res.json({ error: "Create Course Error" });
            }
            return res.json({ message: "Course created successfully" });
          }
        );
      }
    );
  }

  return res.json({ error: "UNAUTHORIZED" });
};
