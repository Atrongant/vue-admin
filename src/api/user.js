import service from "@/utils/request.js";

/* 获取用户列表 */
export function getList(data) {
  return service.request({
    method: "post",
    url: "/user/getList/",
    data,
  });
}
/* 添加用户 */
export function addUser(data) {
  return service.request({
    method: "post",
    url: "/user/add/",
    data,
  });
}
/* 删除用户 */
export function deleteUser(data) {
  return service.request({
    method: "post",
    url: "/user/delete/",
    data,
  });
}
/* 修改用户 */
export function editUser(data) {
  return service.request({
    method: "post",
    url: "/user/edit/",
    data,
  });
}
/* 用户禁启用 */
export function activeUser(data) {
  return service.request({
    method: "post",
    url: "/user/actives/",
    data,
  });
}
/* 用户角色 */
export function userRoles(data) {
  return service.request({
    method: "post",
    url: "/userRole/",
    data,
  });
}
