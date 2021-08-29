import express from "express";
import { addAssignment, submitAssignment } from "../controllers/assignments";
import { isAuth } from "../middleware/auth";

const router = express.Router();
router.post("/submit", isAuth, submitAssignment);
router.post("/:courseID", isAuth, addAssignment);

export default router;
