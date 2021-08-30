import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import Course from "../models/Course";

export const submitAssignment = async (req: Request, res: Response) => {
  const { link, assignment } = req.body;
  // TODO: check for due date & previous submissions
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
  const { courseID, title, description, dueDate } = req.body;

  if (!res.locals.isStudent) {
    Course.findByIdAndUpdate(
      courseID,
      { $push: { assignments: { title, description, dueDate } } },
      (e) => {
        if (e) {
          console.log(e);
          return res.json({ error: "Assignment Creation Error" });
        } else return res.json({ message: "Assignment Created successfully" });
      }
    );
  } else return res.json({ error: "UNAUTHORIZED" });
};

export const getAssignment = async (req: Request, res: Response) => {
  const courseID = mongoose.Types.ObjectId(req.params.courseID);
  Course.aggregate(
    [
      { $match: { _id: courseID } },
      { $project: { tests: 0, schedule: 0, __v: 0 } },
      { $unwind: "$assignments" },
      { $sort: { "assignments.dueDate": -1 } },
      {
        $group: {
          _id: { name: "$name", professor: "$professor" },
          assignments: { $push: "$assignments" },
        },
      },
    ],
    (e: any, data: any) => {
      if (e) {
        console.log(e);
        return res.json({ error: "Assignment Fetch Error" });
      } else return res.json(data);
    }
  );
};

export const viewSubmission = async (req: Request, res: Response) => {
  const assignment = mongoose.Types.ObjectId(req.params.assignmentID);
  User.aggregate([
    { $match: { "assignmentSubmission.assignment": assignment } },
  ]);
};
