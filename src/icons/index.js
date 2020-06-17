import Vue from "vue";
import SvgIcon from "./svgicons";
/* 自定义全局组件 */
Vue.component("svg-icon", SvgIcon);
const req = require.context("./svg", false, /\.svg$/);
const requireAll = (requireContext) => {
  console.log("index.js/7:", requireContext.keys());
  return requireContext.keys().map(requireContext);
};
requireAll(req);
