import { reactive } from "@vue/composition-api";
export function paginationHook() {
  const pageData = reactive({
    currentPage: 1,
    pageSize: 10,
    totalPage: 100,
    pageSizes: [10, 20, 50, 100],
  });
  const setPagetTotal = (val) => {
    pageData.totalPage = val;
  };
  const handleSizeChange = (val) => {
    pageData.pageSize=val;
  };
  const handleCurrentChange = (val) => {
    pageData.currentPage=val;
  };
  return {
    pageData,
    handleSizeChange,
    handleCurrentChange,
    setPagetTotal,
  };
}
