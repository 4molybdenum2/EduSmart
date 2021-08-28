import { submitAssignment } from "../controllers/assignments";
import express from "express";

const router = express.Router();
router.post("/:courseID");
router.post("/:assignmentID", submitAssignment);

export default router;
