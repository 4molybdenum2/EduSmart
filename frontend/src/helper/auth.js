import axios from "axios";

export const auth = (user, url) =>
  axios
    .post(`${API_Login}/${url}`, user)
    .then((res) => res.json())
    .catch((e) => console.log(e));