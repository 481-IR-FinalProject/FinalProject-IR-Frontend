import { boot } from "quasar/wrappers";
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
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
export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = apiClient;
});

export { apiClient };
