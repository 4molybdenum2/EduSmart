import express from "express";
import { isAuth } from "../middleware/auth";
import { addCourse, getCourses } from "../controllers/courses";

const router = express.Router();
router.get("/:userID", getCourses);
router.post("/:userID", isAuth, addCourse);

export default router;
