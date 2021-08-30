import express from "express";
import {
  addAssignment,
  getAssignment,
  submitAssignment,
  viewSubmission,
} from "../controllers/assignments";

const router = express.Router();
router.post("/submit", submitAssignment);
router.post("/create", addAssignment);
router.get("/:courseID", getAssignment);
router.get("/view/:assignmentID", viewSubmission);

export default router;
