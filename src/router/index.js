import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Layout from "@/views/layout";

const routes = [
  {
    path: "/",
    redirect: "login",
    meta: {
      name: "主页",
    },
    hidden: true,
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/login/index.vue"),
    meta: {
      name: "登录",
    },
    hidden: true,
  },
  /* 控制台 */
  {
    path: "/console",
    name: "Console",
    component: Layout,
    meta: {
      name: "控制台",
      icon:"console",
    },
    hidden: false,
    redirect: "/index",
    children: [
      {
        path: "/index",
        name: "Index",
        component: () => import("../views/console/index.vue"),
        meta: {
          name: "首页",
        },
        hidden: false,
      },
    ],
  },
  /* 信息管理 */
  {
    path: "/info",
    name: "Info",
    component: Layout,
    meta: {
      name: "信息管理",
      icon:"info"
    },
    hidden: false,
    children: [
      {
        path: "/infoIndex",
        name: "InfoIndex",
        component: () => import("../views/info/index.vue"),
        meta: {
          name: "信息列表",
        },
        hidden: false,
      },
      {
        path: "/infoCategory",
        name: "InfoCategory",
        component: () => import("../views/info/category.vue"),
        meta: {
          name: "信息分类",
        },
        hidden: false,
      },
    ],
  },
  /* 用户管理 */
  {
    path: "/user",
    name: "User",
    component: Layout,
    meta: {
      name: "用户管理",
      icon:"user"
    },
    hidden: false,
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        component: () => import("../views/user/index.vue"),
        meta: {
          name: "用户列表",
        },
        hidden: false,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
