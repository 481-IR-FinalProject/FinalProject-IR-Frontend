import apiClient from "boot/axios.js";
import GStore from "src/store/GStore";
export default {
  login(user) {
    return apiClient
      .post("/auth", {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        GStore.currentUser = response.data.user;
        return Promise.resolve(response.data);
      });
  },
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("authorities");
    GStore.currentUser = null;
    GStore.authorities = null;
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
      email: user.username,
      username: user.username,
      password: user.password,
      firstname: user.firstname,
      lastname: user.lastname,
    });
  },
};
