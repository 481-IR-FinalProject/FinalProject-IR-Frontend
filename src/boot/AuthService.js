import apiClient from "boot/axios.js";
import GStore from "src/store/GStore";
export default {
  async login(user) {
    const response = await apiClient
      .post("/login", {
        username: user.username,
        password: user.password
      });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    GStore.currentUser = response.data.user;
    return await Promise.resolve(response.data);
  },
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    GStore.currentUser = null;
  },
  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },
  hasRoles(roles) {
    if (GStore.currentUser && roles) {
      let containRoles = GStore.currentUser.authorities.filter((authorities) =>
        roles.includes(authorities.name)
      );
      if (containRoles.length > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  register(user) {
    return apiClient.post("/register", {
      username: user.username,
      password: user.password,
    });
  },
};
