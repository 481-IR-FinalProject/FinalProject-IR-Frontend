import AuthService from "src/boot/AuthService";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("pages/Food/FoodList.vue"),
    beforeEnter: () => {
      if (localStorage.getItem("user") == null) {
        return { name: "Login" };
      }
    },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("pages/Authentication/Login.vue"),
    beforeEnter: () => {
      if (AuthService.hasRoles("ROLE_VISITOR")) {
        return { name: "Home" };
      }
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("pages/Authentication/Register.vue"),
    beforeEnter: () => {
      if (AuthService.hasRoles("ROLE_VISITOR")) {
        return { name: "Home" };
      }
    },
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
