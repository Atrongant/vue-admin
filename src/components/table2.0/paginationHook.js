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
    console.log('paginationHook.js->13:\t',val)
    pageData.pageSize=val;
  };
  const handleCurrentChange = (val) => {
    console.log('paginationHook.js->16:\t',val)
    pageData.currentPage=val;
  };
  return {
    pageData,
    handleSizeChange,
    handleCurrentChange,
    setPagetTotal,
  };
}
