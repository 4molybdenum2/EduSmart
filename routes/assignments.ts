import express from "express";
import multer from "multer";

import {
  addAssignment,
  getAssignment,
  submitAssignment,
  viewSubmission,
} from "../controllers/assignments";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/submit", upload.single('file'), submitAssignment);
router.post("/create", addAssignment);
router.get("/:courseID", getAssignment);
router.post("/view", viewSubmission);

export default router;
