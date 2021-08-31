import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export const BACKEND_API = "http://localhost:8000";
export const FRONTEND_URL = "http://localhost:3000";

export const auth = (user, url) =>
  axios
    .post(`/users/${url}`, user)
    .then((res) => res.data)
    .catch((e) => console.log(e));

export const getAssignments = (courseID) =>
  axios
    .get(`/assignments/${courseID}`)
    .then((res) => res.data)
    .catch((e) => console.log(e));

export const createAssignment = (assignment) =>
  axios
    .post("/assignments/create", assignment)
    .then((res) => res.data)
    .catch((e) => console.log(e));

export const fileUploadAPI = (file, assignmentID) =>
    axios.post('/assignments/submit',  {
      body: {
        assignment: assignmentID,
        file: file,
      },
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((res) => res.data)
    .catch((e) => console.log(e));

export const viewSubmissions = (courseID, assignmentID) =>
  axios
    .post("/assignments/view", { courseID, assignmentID })
    .then((res) => res.data)
    .catch((e) => console.log(e));

export const getCourses = () =>
  axios
    .get("/courses")
    .then((res) => res.data)
    .catch((e) => console.log(e));

export const addCourseStudent = (courseID) =>
  axios
    .post(`/users/${courseID}`)
    .then((res) => res.data)
    .catch((e) => console.log(e));

export const unlinkCourse = (courseID) =>
  axios
    .post(`/users/unlink/${courseID}`)
    .then((res) => res.data)
    .catch((e) => console.log(e));

export const createCourse = (course) =>
  axios
    .post("/courses/create", course)
    .then((res) => res.data)
    .catch((e) => console.log(e));

export const getTestResultsStudent = () =>
  axios
    .get("/users/results")
    .then((res) => res.data)
    .catch((e) => console.log(e));

export const getCourseTests = () =>
  axios
    .get("/courses/tests")
    .then((res) => res.data)
    .catch((e) => console.log(e));

export const getTestResults = (courseID, testID) =>
  axios
    .get(`/tests/${courseID}/${testID}/results`)
    .then((res) => res.data)
    .catch((e) => console.log(e));

export const getSchedule = () =>
  axios
    .get("/users/schedule")
    .then((res) => console.log(res.data))
    .catch((e) => console.log(e));

export const forgotPasswordAPI = (email) =>
  axios
    .post("/users/forgot",{
      email,
    })
    .then((res) => res.data)
    .catch((e) => console.log(e));

export const resetPasswordAPI = (token, newPassword) =>
  axios
    .post("/users/reset",{
      token,
      newPassword,
    })
    .then((res) => res.data)
    .catch((e) => console.log(e));

export const verifyEmailAPI = (token) =>
    axios
      .post("/users/verify",{
        token,
      })
      .then((res) => res.data)
      .catch((e) => console.log(e));

export const onAuth = (data, next) => {
  if (typeof window !== "undefined")
    localStorage.setItem("user", JSON.stringify(data));
  next();
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") return false;
  else
    return localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : false;
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
    axios
      .get(`/users/logout`)
      .then((res) => res.data)
      .catch((e) => console.log(e));
  }
};

