import mongoose, { Document } from "mongoose";
import { Course, Assignment, Test } from "./Course";

const userSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, unique: true, index: true },
  isStudent: { type: Boolean, default: true },
  password: String,
  googleId: String,
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  verified: { type: Boolean, default: false },
  assignmentSubmissions: [
    {
      _id: false,
      assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment" },
      link: String,
      marks: Number
    },
  ],
  testSubmissions: [
    {
      _id: false,
      test: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
      marks: Number,
    },
  ],
});

interface AssignmentSubmission {
  assignment: Assignment;
  link: string;
  marks: number;
}

interface TestSubmission {
  test: Test;
  marks: number;
}

export interface User extends Document {
  name: string;
  email: string;
  isStudent: boolean;
  verified: boolean;
  _id: mongoose.Types.ObjectId;
  password: string;
  googleId: string;
  courses: Array<Course>;
  assignmentSubmissions: Array<AssignmentSubmission>;
  testSubmissions: Array<TestSubmission>;
}

export default mongoose.model<User>("User", userSchema);
