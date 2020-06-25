import { reactive } from "@vue/composition-api";
import { loadTable } from "@/api/common";
import { getList } from "@/api/user";
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
  const loadUserDataForTable = (params) => {
    getList(params)
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
    loadUserDataForTable,
  };
}
