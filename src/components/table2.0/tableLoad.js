import { reactive } from "@vue/composition-api";
import { loadTable } from "@/api/common";
export function TableLoad() {
  const dataOfTable = reactive({
    item: [],
    total: 0,
  });

  const loadDataForTable = (params) => {
    loadTable(params)
      .then((response) => {
        if (response.data.data) {
          dataOfTable.item = response.data.data;
          dataOfTable.total = response.data.total;
        }
      })
      .catch((err) => {});
  };
  return {
    dataOfTable,
    loadDataForTable,
  };
}
