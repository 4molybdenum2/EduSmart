import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";

export const auth = (user, url) =>
  axios
    .post(`/users/${url}`, user)
    .then((res) => res.data)
    .catch((e) => console.log(e));

export const getCourses = () =>
  axios
    .get("/courses")
    .then((res) => {
      console.log(res);
      return res.data;
    })
    .catch((e) => console.log(e));

export const createCourse = (course) => {
  axios
    .post("/courses/create", course)
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((e) => console.log(e));
};

export const onAuth = (data, next) => {
  if (typeof window !== "undefined")
    localStorage.setItem("jwt", JSON.stringify(data));
  next();
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") return false;
  else
    return localStorage.getItem("jwt")
      ? JSON.parse(localStorage.getItem("jwt"))
      : false;
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    axios
      .get(`/users/logout`)
      .then((res) => res.data)
      .catch((e) => console.log(e));
  }
};
