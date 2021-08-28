import { Request, Response } from "express";
import User from "../models/User";
import Course from "../models/Course";

export const submitAssignment = async (req: Request, res: Response) => {
  if (req.cookies?.token) {
    const assignmentID = req.params.assignmentID;
    const { link } = req.body;

    // TODO: Get isStudent and user ID from cookie or frontend
    const isStudent = true;
    const userID = "6129eca18d88cf29a0ad2a59";

    if (isStudent) {
      User.findByIdAndUpdate(
        userID,
        { $push: { assignmentSubmissions: { assignment: assignmentID, link } } },
        (e) => {
          if (e) {
            console.log(e);
            return res.status(500).json({ error: "Assignment Submission Error" });
          }
          return res.json({ message: "Assignment Submitted successfully" });
        }
      );
    }

    return res.status(403).json({ error: "UNAUTHORIZED" });
  }
  return res.json({ error: "You are not logged in" });
};

export const addAssignment = async (req: Request, res: Response) => {
  if (req.cookies?.token) {
    const courseID = req.params.courseID;
    const { title, description, dueDate } = req.body;

    // TODO: Get isStudent from cookie or frontend
    const isStudent = false;

    if (!isStudent) {
      Course.findByIdAndUpdate(
        courseID,
        { $push: { assignments: { title, description, dueDate } } },
        (e) => {
          if (e) {
            console.log(e);
            return res
              .status(500)
              .json({ error: "Assignment Creation Error" });
          }
          return res.json({ message: "Assignment Created successfully" });
        }
      );
    }

    return res.status(403).json({ error: "UNAUTHORIZED" });
  }
  return res.json({ error: "You are not logged in" });
}