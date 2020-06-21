import Vue from "vue";
import SvgIcon from "./svgicons";
/* 自定义全局组件 */
Vue.component("svg-icon", SvgIcon);
// svg文件解析
const req = require.context("./svg", false, /\.svg$/);
const requireAll = (requireContext) => {
  return requireContext.keys().map(requireContext);
};
requireAll(req);