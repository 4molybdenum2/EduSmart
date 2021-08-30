import express from "express";
import { isAuth } from "../middleware/auth";
import {
  enroll,
  getSchedule,
  login,
  logout,
  signUp,
  testResults,
  unenroll,
} from "../controllers/users";

const router = express.Router();
router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logout);

router.post("/:courseID", isAuth, enroll);
router.post("/unlink/:courseID", isAuth, unenroll);

router.get("/results", isAuth, testResults);
router.get("/schedule", isAuth, getSchedule);

export default router;
