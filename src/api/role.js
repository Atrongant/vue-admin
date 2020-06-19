import service from "@/utils/request.js";
/* 获取角色 */
export function getRole(data) {
  return service.request({
    method: "post",
    url: "/role/",
    data,
  });
}
/* 获取系统 */
export function getSystem(data) {
  return service.request({
    method: "post",
    url: "/system/",
    data,
  });
}
/* 按钮权限 */
export function permButton(data) {
  return service.request({
    method: "post",
    url: "/permButton/",
    data,
  });
}
