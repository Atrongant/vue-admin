import { getCategoryAll, getCategory } from "@/api/news.js";
import { ref, reactive } from "@vue/composition-api";
export function common() {
  /* 只包含一级分类 */
  const categoryData = reactive({
    item: [],
  });
  /* 包含 一二级分类 */
  const categoryData2 = reactive({
    item: [],
  });
  const getInfoCateAll = () => {
    getCategoryAll({})
      .then((response) => {
        categoryData.item = response.data;
      })
      .catch((err) => {});
  };
  // const getInfoCate = () => {
  //   getCategory({})
  //     .then((response) => {
  //       categoryData2.item = response.data;
  //     })
  //     .catch((err) => {});
  // };
  return {
    categoryData,
    getInfoCateAll,
    // getInfoCate,
  };
}
