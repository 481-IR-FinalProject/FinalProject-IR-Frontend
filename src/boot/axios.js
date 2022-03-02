import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://127.0.0.1:5000/",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem("token");
    if (token) {
      request.headers["Authorization"] = "Bearer " + token;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
