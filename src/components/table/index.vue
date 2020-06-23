<template>
  <section>
    <el-table :data="data.tableData" border style="width: 100%">
      <el-table-column type="selection" width="55" v-if="data.tableConfig.selection"></el-table-column>
      <template v-for="item in data.tableConfig.tHead">
        <el-table-column
          :prop="item.field"
          :width="item.width"
          v-if="item.columnType=='slot'"
          :key="item.field"
          :label="item.label"
        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :prop="item.field"
          :key="item.field"
          :label="item.label"
          :width="item.width"
        ></el-table-column>
      </template>
    </el-table>
    <el-pagination
      background
      v-if="data.tableConfig.pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageData.currentPage"
      :page-sizes="pageData.pageSizes"
      :page-size="pageData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageData.totalPage"
    ></el-pagination>
  </section>
</template>

<script>
import { reactive, onBeforeMount, watch } from "@vue/composition-api";
import { loadTable } from "@/api/common";
import { TableLoad } from "./tableLoad";
import { paginationHook } from "./paginationHook";
export default {
  name: "index",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  data(props) {
    const { dataOfTable, loadDataForTable } = TableLoad();
    const {
      pageData,
      handleSizeChange,
      handleCurrentChange,
      setPagetTotal
    } = paginationHook();
    const data = reactive({
      tableConfig: {
        requestData: {},
        selection: true,
        requestUrl: "",
        tHead: {},
        recordCheck: true,
        pagination: true
      },
      tableData: [
      ]
    });
    let initConfigTable = () => {
      let configtable = props.config;
      let keys = Object.keys(data.tableConfig);
      for (let key in configtable) {
        if (keys.includes(key)) {
          data.tableConfig[key] = props.config[key];
        }
      }
    };
    initConfigTable();
    // let loadTableData = () => {
    //   console.log("index.vue->89:\t", data.tableConfig.requestData);
    //   loadTable(data.tableConfig.requestData)
    //     .then(response => {
    //       console.log("index.vue->91:\t", response);
    //       if (response.data.data) {
    //         data.tableData = response.data.data;
    //       }
    //     })
    //     .catch(err => {});
    // };
    // loadTableData();
    loadDataForTable(data.tableConfig.requestData);
    // onBeforeMount(() => {

    // });
    // watch(
    //   () => dataOfTable.item,
    //   (newValue, oldValue) => {
    //     data.tableData = newValue;
    //   }
    // );
    watch(
      [() => dataOfTable.item, () => dataOfTable.total],
      ([tables, total]) => {
        data.tableData = tables;
        setPagetTotal(total);
      }
    );
    watch(
      [() => pageData.currentPage, () => pageData.pageSize],
      ([curPage, pagesize]) => {
        // FIXME
        if (data.tableConfig.requestData.data) {
          data.tableConfig.requestData.data.pageSize = pagesize;
          data.tableConfig.requestData.data.pageNumber = curPage;
          loadDataForTable(data.tableConfig.requestData);
        }
        console.log("index.vue->146:\t", data.tableConfig.requestData.data);
      }
    );
    return { data, pageData, handleSizeChange, handleCurrentChange };
  }
};
</script>

<style scoped lang="less">
</style>
