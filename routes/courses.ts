import express from "express";
import { addCourse, getCourses } from "../controllers/courses";

const router = express.Router();
router.get("/:userID", getCourses);
router.post("/:userID", addCourse);

export default router;
