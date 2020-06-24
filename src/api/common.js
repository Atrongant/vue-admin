import { getCategoryAll } from "@/api/news.js";
import { ref, reactive } from "@vue/composition-api";
import service from "@/utils/request.js";
export function common() {
  /* 只包含一级分类 */
  const categoryData = reactive({
    item: [],
  });

  const getInfoCateAll = () => {
    getCategoryAll({})
      .then((response) => {
        categoryData.item = response.data;
      })
      .catch((err) => {});
  };
  return {
    categoryData,
    getInfoCateAll,
    // getInfoCate,
  };
}
/* 获取七牛云token*/
export function uploadImgToken(data) {
  return service.request({
    method: "post",
    url: "/uploadImgToken/",
    data,
  });
}

/* 获取列表 */
export function loadTable(requestdata) {
  return service.request({
    method: requestdata.post || "post",
    url: requestdata.requestUrl,
    data: requestdata.data || {},
  });
}
/* 获取城市列表 */
export function cityPick(data) {
  return service.request({
    method: "post",
    url: "/cityPicker/",
    data,
  });
}
