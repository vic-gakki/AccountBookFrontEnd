import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../views/Layout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Layout",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "home",
        name: "Home",
        component: () => import(/* webpackChunkName: "home" */ "../views/Home"),
      },
      {
        path: "/about",
        name: "About",
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/About.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import(/* webpackChunkName: "login" */ "../views/Login"),
  },
  {
    path: "/404",
    name: "Error",
    component: () => import("../views/404"),
  },
  {
    path: "*",
    name: "Other",
    redirect: "/404",
  },
];

const router = new VueRouter({
  routes,
});

export default router;
