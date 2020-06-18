import router from "./index";
import store from "@/store/index";
import { getToken, removeToken,removeUsername } from "@/utils/app";
// import { removeToken } from "../utils/app";

const whiteRouter = ["/login"];

// 路由守卫 路由改变的时候触发
router.beforeEach((to, from, next) => {
  console.log("permit.js/8:\t", to);
  if (getToken()) {
    if (to.path === "/login") {
      removeToken();
      removeUsername();
      store.commit("app/REMOVE_TOKEN");
      store.commit("app/REMOVE_USERNAME");
      // SET_TOKEN(state, value) {
      //   state.token = value;
      // },
      // REMOVE_TOKEN(state) {
    }else{
      // TODO 
      // 动态分配路由权限，获取用户角色
    }
    next();
  } else {
    //没有token要进入别的页面，路由跳转到登录页面
    if (~whiteRouter.indexOf(to.path)) {
      next();
    } else {
      next("/login");
    }
    console.log("permit.js/7:", "not exist");
  }
});
