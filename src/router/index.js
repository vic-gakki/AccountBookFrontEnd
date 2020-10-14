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
        meta: {icon: 'dashboard', title: '首页'},
        component: () => import(/* webpackChunkName: "home" */ "../views/Home"),
      },
      {
        path: "account",
        name: "Account",
        meta: {icon: 'book', title: '账本'},
        component: () =>
          import(/* webpackChunkName: "account" */ "../views/Account"),
      },
      {
        path: 'setting',
        name: 'Setting',
        meta: {icon: 'setting', title: '设置'},
        component: () => import("../views/Setting")
      },
      {
        path: 'test',
        name: 'TestNav1',
        meta: {icon: 'dashboard', title: 'test nav 1'},
        component: () => import('../views/Test'),
        children: [
          {
            path: "childone",
            name: "childone",
            meta: {icon: 'book', title: 'test nav 1-1'},
            component: () => import(/* webpackChunkName: "home" */ "../views/Home"),
          },
          {
            path: "childtwo",
            name: "childtwo",
            meta: {icon: 'book', title: 'test nav 1-2'},
            component: () =>
              import(/* webpackChunkName: "account" */ "../views/Account"),
          },
        ]
      }
    ],
  },
  {
    path: "*",
    name: "Other",
    hidden: true,
    redirect: "/404",
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
]


const createRouter = () => new VueRouter({
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter(){
  const initRouter = createRouter()
  router.matcher = initRouter.matcher
}

export default router;
