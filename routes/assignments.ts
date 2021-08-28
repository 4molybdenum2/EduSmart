import { addAssignment, submitAssignment } from "../controllers/assignments";
import express from "express";
import { isAuth } from "../middleware/auth";

const router = express.Router();
router.post("/:courseID", isAuth, addAssignment);
router.post("/:assignmentID", isAuth, submitAssignment);

export default router;
