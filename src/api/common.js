import { getCategoryAll } from "@/api/news.js";
import { ref, reactive } from "@vue/composition-api";
export function common() {
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
  };
}
