import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  // baseURL: "https://backend-vinways.herokuapp.com/api/v1",
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common["Authorization"];
  }
};