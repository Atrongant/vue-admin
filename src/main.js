import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// 引入svg组件
import "./icons";
import "./router/permit.js";
import globalConfirm from "@/utils/global.js";
Vue.use(VueCompositionApi);

Vue.use(ElementUI);
Vue.use(globalConfirm);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
