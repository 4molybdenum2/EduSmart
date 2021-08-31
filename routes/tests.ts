import express from "express";
import {
  createTest,
  submitTest,
  viewTest,
  viewResults
} from "../controllers/tests";

const router = express.Router({ mergeParams: true });
router.post("/new", createTest);
router.get("/:testId/view", viewTest);
router.get("/:testId/results", viewResults);
router.post("/:testId/submit", submitTest);

export default router;
