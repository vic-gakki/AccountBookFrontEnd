import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../layout";

Vue.use(VueRouter);

export const asyncRoutes = [
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
];

export const constantRoutes = [
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
]


const createRouter = () => new VueRouter({
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes.concat(asyncRoutes)
})

const router = createRouter()

export function resetRouter(){
  const initRouter = createRouter()
  router.matcher = initRouter.matcher
}

export default router;
