import service from "@/utils/request.js";
/* 添加一级分类 */
export function addFirstCategory(data) {
  return service.request({
    method: "post",
    url: "/news/addFirstCategory/",
    data,
  });
}
/* 添加二级分类 */
export function addChildrenCategory(data) {
  return service.request({
    method: "post",
    url: "/news/addChildrenCategory/",
    data,
  });
}
/* 删除信息分类 */
export function deleteCategory(data) {
  return service.request({
    method: "post",
    url: "/news/deleteCategory/",
    data,
  });
}
/* 修改信息分类 */
export function editCategory(data) {
  return service.request({
    method: "post",
    url: "/news/editCategory/",
    data,
  });
}
/* 获取信息分类 */
export function getCategory(data) {
  return service.request({
    method: "post",
    url: "/news/getCategory/",
    data,
  });
}
/* 添加一级分类 有子级分类*/
export function getCategoryAll(data) {
  return service.request({
    method: "post",
    url: "/news/getCategoryAll/",
    data,
  });
}
