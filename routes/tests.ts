import express from "express";
import { isAuth } from "../middleware/auth";
import {
  createTest,
  getTest,
  submitTest,
  viewTest,
} from "../controllers/tests";

const router = express.Router();
router.post("/new", isAuth, createTest);
router.get("/:testId", isAuth, viewTest);
router.get("/:testId/teachers", isAuth, getTest);
router.post("/:testId/submit", isAuth, submitTest);

export default router;
