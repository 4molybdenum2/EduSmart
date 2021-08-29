import express from "express";
import {
  createTest,
  getTest,
  submitTest,
  viewTest,
  viewResults
} from "../controllers/tests";

const router = express.Router();
router.post("/new", createTest);
router.get("/:testId/view", viewTest);
router.get("/:testId", getTest);
router.get("/:testId/results", viewResults);
router.post("/:testId/submit", submitTest);

export default router;
