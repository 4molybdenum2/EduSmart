import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export const auth = (user, url) =>
  axios
    .post(`/users/${url}`, user)
    .then((res) => res.data)
    .catch((e) => console.log(e));

export const getCourses = () =>
  axios
    .get("/courses")
    .then((res) => res.data)
    .catch((e) => console.log(e));

export const getAssignments = (courseID) =>
  axios
    .get(`/assignments/${courseID}`)
    .then((res) => res.data)
    .catch((e) => console.log(e));

export const getTestResults = () =>
  axios
    .get(`/users/results`)
    .then((res) => res.data)
    .catch((e) => console.log(e));

export const createCourse = (course) =>
  axios
    .post("/courses/create", course)
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
