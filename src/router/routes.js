import AuthService from "src/boot/AuthService";
import FoodService from "src/boot/FoodService";
import GStore from "src/store/GStore";

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
    path: '/food/:id',
    name: 'FoodDetail',
    component: () => import("pages/Food/FoodDetail.vue"),
    beforeEnter: async (to) => {
      const response = await FoodService.getFoodByID(to.params.id);
      GStore.food = response.data;
    }
  },
  {
    path: '/user',
    name: 'UserDetail',
    component: () => import("pages/User/UserDetail.vue"),
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
