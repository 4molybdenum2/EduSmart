import express from "express";
import {
  createTest,
  submitTest,
  viewTest,
  viewResults
} from "../controllers/tests";

const router = express.Router();
router.post("/:courseId/new", createTest);
router.get("/:testId/view", viewTest);
router.get("/:courseId/:testId/results", viewResults);
router.post("/:testId/submit", submitTest);

export default router;
