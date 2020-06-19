import { Login } from "@/api/login";
import {
  setToken,
  setUsername,
  getUsername,
  getToken,
  removeToken,
  removeUsername,
} from "@/utils/app";
const state = {
  // 刷新页面 值会被重置成false，页面又回到false的状态
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false,
  token: getToken() || "",
  username: getUsername() || "",
};
const getters = {
  //computed
  isCollapse: (state) => state.isCollapse,
  username: (state) => state.username,
};
const mutations = {
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
  },
  SET_TOKEN(state, value) {
    state.token = value;
  },
  REMOVE_TOKEN(state) {
    state.token = "";
  },
  SET_USERNAME(state, value) {
    state.username = value;
  },
  REMOVE_USERNAME(state) {
    state.username = "";
  },
};
const actions = {
  // content   cxt第一个参数指向state,getters,mutations...
  login(content, data) {
    return new Promise((resolve, reject) => {
      Login(data)
        .then((response) => {
          let data = response.data;
          content.commit("SET_TOKEN", data.token);
          content.commit("SET_USERNAME", data.username);
          setToken(data.token);
          setUsername(data.username);
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  exit(content) {
    return new Promise(resolve=>{
      content.commit("REMOVE_TOKEN");
      content.commit("REMOVE_USERNAME");
      removeUsername();
      removeToken();
      resolve();
    });
  },
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
