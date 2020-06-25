<template>
  <section>
    <el-table
      :data="data.tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
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
    <div class="table-footer">
      <el-row>
        <el-col :span="4">
          <slot name="tableFooterLeft"></slot>
        </el-col>
        <el-col :span="20">
          <el-pagination
            class="pull-right"
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
        </el-col>
      </el-row>
    </div>
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
    },
    tableRow: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { emit }) {
    const { dataOfTable, loadDataForTable, loadUserDataForTable } = TableLoad();
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
      tableData: []
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
    loadDataForTable(data.tableConfig.requestData);
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
        if (data.tableConfig.requestData.data) {
          data.tableConfig.requestData.data.pageSize = pagesize;
          data.tableConfig.requestData.data.pageNumber = curPage;
          loadDataForTable(data.tableConfig.requestData);
        }
      }
    );
    const handleSelectionChange = val => {
      let rowData = {
        idItem: val.map(item => item.id)
      };
      emit("update:tableRow", rowData);
    };
    const refreshTable = () => {
      loadDataForTable(data.tableConfig.requestData);
    };
    const paramLoadData = params => {
      let requestData = Object.assign({}, params, {
        pageNumber: 1,
        pageSize: 10
      });
      loadUserDataForTable(requestData);
    };
    return {
      data,
      pageData,
      handleSizeChange,
      handleCurrentChange,
      handleSelectionChange,
      refreshTable,
      paramLoadData
    };
  }
};
</script>

<style scoped lang="scss">
.table-footer {
  padding: 15px 0;
}
</style>
