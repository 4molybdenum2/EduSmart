import express from "express";
import { isAuth } from "../middleware/auth";
import {
  enroll,
  login,
  logout,
  signUp,
  testResults,
} from "../controllers/users";

const router = express.Router();
router.post("/signup", signUp);
router.post("/login", login);
router.get("/logout", logout);

router.post("/:courseID", isAuth, enroll);
router.get("/results", isAuth, testResults);

export default router;
