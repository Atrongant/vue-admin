import Vue from "vue";
import Vuex from "vuex";
import Cookie from "cookiejs";
import { Login } from "@/api/login";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 刷新页面 值会被重置成false，页面又回到false的状态
    isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
    count: 10,
  },
  // 属性计算
  getters: {
    //computed
    isCollapse: (state) => state.isCollapse,
  },
  mutations: {
    SET_COLLAPSE(state) {
      state.isCollapse = !state.isCollapse;
      Cookie.set("isCollapse", JSON.stringify(state.isCollapse));
      sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
    },
  },
  actions: {
    // content   cxt第一个参数指向state,getters,mutations...
    login(content, data) {
      console.log("index.js/28:", data);
      return new Promise((resolve, reject) => {
        Login(data)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
  modules: {},
});
