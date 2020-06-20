import service from "@/utils/request.js";
/* 获取信息列表 */
export function getList(data) {
  return service.request({
    method: "post",
    url: "/news/getList/",
    data,
  });
}
/* 添加信息列表 */
export function addInfo(data) {
  return service.request({
    method: "post",
    url: "/news/add/",
    data:data
  });
}
/* 修改信息列表 */
export function editInfo(data) {
  return service.request({
    method: "post",
    url: "/news/editInfo/",
    data,
  });
}
/* 删除信息列表 */
export function deleteInfo(data) {
  return service.request({
    method: "post",
    url: "/news/deleteInfo/",
    data,
  });
}
