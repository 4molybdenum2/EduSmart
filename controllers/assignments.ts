import { Request, Response } from "express";
import User from "../models/User";
import Course from "../models/Course";

export const submitAssignment = async (req: Request, res: Response) => {
  const { link, assignment } = req.body;

  if (res.locals.isStudent) {
    User.findByIdAndUpdate(
      res.locals.id,
      { $push: { assignmentSubmissions: { assignment, link } } },
      (e) => {
        if (e) {
          console.log(e);
          return res.json({ error: "Assignment Submission Error" });
        }
        return res.json({ message: "Assignment Submitted successfully" });
      }
    );
  } else return res.json({ error: "UNAUTHORIZED" });
};

export const addAssignment = async (req: Request, res: Response) => {
  const courseID = req.params.courseID;
  const { title, description, dueDate } = req.body;

  if (!res.locals.isStudent) {
    Course.findByIdAndUpdate(
      courseID,
      { $push: { assignments: { title, description, dueDate } } },
      (e) => {
        if (e) {
          console.log(e);
          return res.json({ error: "Assignment Creation Error" });
        }
        return res.json({ message: "Assignment Created successfully" });
      }
    );
  } else return res.json({ error: "UNAUTHORIZED" });
};
