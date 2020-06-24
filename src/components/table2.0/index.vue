<template>
  <section>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="55" v-if="tableConfig.selection"></el-table-column>
      <template v-for="item in tableConfig.tHead">
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
    <!--   <el-pagination
      background
      v-if="tableConfig.pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageData.currentPage"
      :page-sizes="pageData.pageSizes"
      :page-size="pageData.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageData.totalPage"
    ></el-pagination>-->
  </section>
</template>

<script>
import { reactive, onBeforeMount, watch } from "@vue/composition-api";
import { loadTable } from "@/api/common";
import { TableLoad } from "./tableLoad";
import { paginationHook } from "./paginationHook";
import tableLoadData from "@/mixins/tableLoadData";
export default {
  name: "index",
  mixins: [tableLoadData],
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      tableConfig: {
        requestData: {},
        selection: true,
        requestUrl: "",
        tHead: {},
        recordCheck: true,
        pagination: true
      },
      tableData: []
    };
  },
  methods: {
    initConfigTable() {
      let configtable = this.config;
      let keys = Object.keys(this.tableConfig);
      for (let key in configtable) {
        if (keys.includes(key)) {
          this.tableConfig[key] = this.config[key];
        }
      }
    }
  },
  beforeMount() {
    this.initConfigTable();
  },
  mounted() {}
};
</script>

<style scoped lang="less">
</style>
