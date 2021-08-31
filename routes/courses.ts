import express from "express";
import { addCourse, getCourses, getCourseTests } from "../controllers/courses";

const router = express.Router();
router.get("/", getCourses);
router.post("/create", addCourse);
router.get("/tests", getCourseTests);

export default router;
