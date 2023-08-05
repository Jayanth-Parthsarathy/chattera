import axios from "axios";

const instance = axios.create({
  baseURL: "https://chattera.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
    timeout: 1000,
  },
});
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete instance.defaults.headers.common.Authorization;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default instance;
