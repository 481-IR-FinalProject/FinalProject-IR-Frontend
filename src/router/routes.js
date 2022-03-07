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
    props: (route) => ({
      page: parseInt(route.query.page) || 1,
    })
  },
  {
    path: "/search=:keyword?/type=:types?",
    name: "SearchResult",
    component: () => import("pages/Food/FoodSearchList.vue"),
    beforeEnter: () => {
      if (localStorage.getItem("user") == null) {
        return { name: "Login" };
      }
    },
    props: (to) => ({
      foodData: to.params.keyword || to.params.keyword,
      choose: to.params.types || to.params.types,
      page: parseInt(to.query.page) || 1,
    })
  },
  {
    path: '/food/:id',
    name: 'FoodDetail',
    component: () => import("pages/Food/FoodDetail.vue"),
    beforeEnter: () => {
      if (localStorage.getItem("user") == null) {
        return { name: "Login" };
      }
    },
  },
  {
    path: '/user',
    name: 'UserDetail',
    component: () => import("pages/User/UserDetail.vue"),
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
      if (localStorage.getItem("user") != null) {
        return { name: "Home" };
      }
    },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("pages/Authentication/Register.vue"),
    beforeEnter: () => {
      if (localStorage.getItem("user") != null) {
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
