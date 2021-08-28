import express from "express";
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

router.post("/:courseID", enroll);
router.get("/results", testResults);

export default router;
