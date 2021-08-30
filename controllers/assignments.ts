import { Request, Response } from "express";
import mongoose from "mongoose";
import User from "../models/User";
import Course, { AssignmentModel } from "../models/Course";

export const submitAssignment = async (req: Request, res: Response) => {
  const { link, assignment } = req.body;
  if (res.locals.isStudent) {
    const asg = await AssignmentModel.findById(assignment);
    if (asg) {
      const user = await User.findById(res.locals.id);
      if (
        !user.assignmentSubmissions
          ?.map((submission) => submission.assignment)
          .includes(assignment)
      ) {
        if (new Date() <= asg.dueDate) {
          try {
            user.assignmentSubmissions.push({ assignment, link });
            await user.save();
            return res.json({ message: "Assignment submitted successfully" });
          } catch (err) {
            return res.json({ error: `Couldn't submit assignment: ${err}` });
          }
        } else
          return res.json({
            error: "The time for submitting the assignment has closed",
          });
      } else
        return res.json({
          error: "You have already submitted this assignment",
        });
    } else return res.json({ error: "Assignment not found" });
  } else
    return res.json({ error: "You must be a student to perform this action" });
};

export const addAssignment = async (req: Request, res: Response) => {
  const { courseID, title, description, dueDate } = req.body;

  if (!res.locals.isStudent) {
    const course = await Course.findById(courseID);
    if (course) {
      try {
        const assignment = new AssignmentModel({
          title,
          description,
          dueDate,
        });
        await assignment.save();
        course.assignments.push(assignment);
        await course.save();
      } catch (err) {
        return res.json({ error: `Couldn't create assignment: ${err}` });
      }
    } else return res.json({ error: "Course not found" });
  } else
    return res.json({ error: "You must be a teacher to perform this action" });
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
          _id: "$_id",
          assignments: { $push: "$assignments" },
        },
      },
      { $project: { _id: 0 } },
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
