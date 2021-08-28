import express from "express";

import { createTest, getTest, submitTest, viewTest } from "../controllers/tests";

const router = express.Router();
router.post("/new", createTest);
router.get("/:testId", viewTest);
router.get("/:testId/teachers", getTest);
router.post("/:testId/submit", submitTest);

export default router;
