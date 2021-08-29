import express from "express";
import { isAuth } from "../middleware/auth";
import { addCourse, getCourses } from "../controllers/courses";

const router = express.Router();
router.get("/", isAuth, getCourses);
router.post("/create", isAuth, addCourse);

export default router;
