import apiClient from "boot/axios.js";
export default {
  async login(user) {
    const response = await apiClient
      .post("/login", {
        username: user.username,
        password: user.password
      });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return await Promise.resolve(response.data);
  },
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },
  register(user) {
    return apiClient.post("/register", {
      username: user.username,
      password: user.password,
    });
  },
};
