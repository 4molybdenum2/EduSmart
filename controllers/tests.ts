import { Request, Response } from "express";
import Courses, { TestModel } from "../models/Course";
import Users from "../models/User";

export const createTest = async (req: Request, res: Response) => {
  if (!res.locals.isStudent) {
    const { title, startTime, endTime, maxMarks, questions } = req.body;
    const course = await Courses.findById(req.params.courseId);
    if (course) {
      try {
        const test = new TestModel({
          title,
          startTime,
          endTime,
          maxMarks,
          questions,
        });
        course.tests.push(test);
        await course.save();
      } catch (e) {
        return res.json({
          error: "Something went wrong, couldn't create course",
        });
      }
    } else return res.json({ error: "Course not found" });
  } else return res.json({ error: "UNAUTHORIZED" });
};

export const getTest = async (req: Request, res: Response) => {
  if (!res.locals.isStudent) {
    const test = await TestModel.findById(req.params.testId);
    if (test) return res.json({ test });

    return res.status(404).json({ error: "Test not found" });
  }
  return res.json({ error: "You must be a teacher to perform this action" });
};

export const viewTest = async (req: Request, res: Response) => {
  if (res.locals.isStudent) {
    const test = await TestModel.findById(req.params.testId);
    if (test) {
      test.questions.map((question) => ({
        title: question.title,
        opt1: question.opt1,
        opt2: question.opt2,
        opt3: question.opt3,
        opt4: question.opt4,
      }));
      return res.json({ test });
    }
    return res.json({ error: "Test not found" });
  }
  return res.json({ error: "UNAUTHORIZED" });
};

export const submitTest = async (req: Request, res: Response) => {
  if (res.locals.isStudent) {
    const test = await TestModel.findById(req.params.testId);
    if (test) {
      const user = await Users.findById(res.locals.id);
      if (user) {
        if (
          !user.testSubmissions
            .map((submission) => submission.test)
            .includes(test)
        ) {
          try {
            const { answers }: { answers: Array<number> } = req.body;
            let count = 0;
            if (answers.length == test.questions.length) {
              for (let i = 0; i < test.questions.length; i++) {
                if (answers[i] == test.questions[i].answer) count++;
              }
              const marks = (count / test.maxMarks) * 100;
              user.testSubmissions.push({
                test,
                marks,
              });
              await user.save();
              return res.json({ marks });
            }
            return res.json(400).json({ error: "Invalid answers list" });
          } catch (err) {
            return res
              .status(500)
              .json({ error: `Couldn't submit test: ${err}` });
          }
        }
        return res.json(409).json({
          error: "You have already submitted a response for this test",
        });
      }
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(404).json({ error: "Test not found" });
  }
  return res
    .status(403)
    .json({ error: "You must be a student to perform this action" });
};
