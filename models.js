const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const crypto = require("crypto");

var userSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  email: { type: String, unique: true },
  isStudent: { type: Boolean, default: true },
  local: {
    securePass: String,
    salt: String,
  },
  googleToken: String,
  courses: { type: mongoose.Schema.ObjectId, ref: "Course" },
});

const courseSchema = new mongoose.Schema({
  name: { type: String, trim: true },
  professor: { type: mongoose.Schema.ObjectId, ref: "User" },
  schedule: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
  },
  assignments: [assignmentSchema],
  tests: [testSchema],
});

const assignmentSchema = new mongoose.Schema({
  title: String,
  description: String,
  dueDate: Date,
});

const testSchema = new mongoose.Schema({
  title: { type: String, trim: true },
  startTime: Date,
  endTime: Date,
  maxMarks: Number,
  questions: [
    {
      title: { type: String, trim: true },
      opt1: { type: String, trim: true },
      opt2: { type: String, trim: true },
      opt3: { type: String, trim: true },
      opt4: { type: String, trim: true },
      answer: Number,
    },
  ],
});

userSchema
  .virtual("password")
  .get(function () {
    return this._pass;
  })
  .set(function (pass) {
    this._pass = pass;
    this.salt = uuid();
    this.securePass = this.createSecurePassword(pass);
  });

userSchema.methods = {
  authenticate: function (pass) {
    return this.createSecurePassword(pass) === this.securePass;
  },
  createSecurePassword: function (pass) {
    if (!pass) return "";
    try {
      return crypto.createHmac("sha256", this.salt).update(pass).digest("hex");
    } catch (e) {
      return "";
    }
  },
};

const User = mongoose.model("User", userSchema);
const Course = mongoose.model("Course", courseSchema);
const Assignment = mongoose.model("Assignment", assignmentSchema);
const Test = mongoose.model("Test", testSchema);

module.exports = { User, Course, Assignment, Test };
