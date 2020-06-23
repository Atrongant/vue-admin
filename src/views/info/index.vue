<template>
  <section>
    <el-row :gutter="14">
      <el-col :span="3">
        <div class="label-wrap category">
          <label for>类型：</label>
          <div class="wrap-content">
            <el-select v-model="categoryValue" placeholder="请选择" style="width:100%;">
              <el-option
                v-for="item in options.category"
                :key="item.id"
                :label="item.category_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label-wrap date">
          <label for>日期：&nbsp;&nbsp;</label>
          <div class="wrap-content">
            <el-date-picker
              v-model="dateValue"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="width:100%;"
              format="yyyy年MM月dd日"
              value-format="yyyy-MM-dd HH:mm:ss"
            ></el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="label-wrap key-word">
          <label for>搜索：</label>
          <div class="wrap-content">
            <SelectVue :config="data.configOption" />
            <!-- <el-select v-model="searchKey" placeholder="请选择" style="width:100%;">
              <el-option
                v-for="item in searchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>-->
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input v-model="searchKeyWord" placeholder="请输入内容" style="width:100%;"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width:100%;" @click="getInfoList">搜索</el-button>
      </el-col>
      <el-col :span="3">&nbsp;</el-col>
      <el-col :span="2" class="pull-right">
        <el-button type="danger" style="width:100%;" @click="dialogInfo=true">新增</el-button>
      </el-col>
    </el-row>
    <div class="blank-space-30"></div>
    <el-table
      :data="tableData.item"
      border
      style="width: 100%"
      v-loading="loading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="title" label="标题" width="750"></el-table-column>
      <el-table-column prop="categoryId" label="类别" width="130" :formatter="toCategory"></el-table-column>
      <el-table-column prop="createDate" label="日期" width="237" :formatter="toDate"></el-table-column>
      <el-table-column prop="user" label="管理人" width="115"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteItem(scope.row.id)">删除</el-button>
          <el-button size="mini" type="success" @click="editInfo(scope.row.id)">编辑</el-button>
          <!-- <router-link
            :to="{name: 'InfoDetails' , params : { id : scope.row.id } }"
            class="margin-left-10"
          >-->
          <el-button
            size="mini"
            type="success"
            @click="detaild( { id : scope.row.id ,title:scope.row.title})"
          >编辑详情</el-button>
          <!-- </router-link> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="blank-space-30"></div>
    <el-row>
      <el-col :span="12">
        <el-button size="medium" @click="deleteAll">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          class="pull-right"
          layout="total,sizes,prev, pager, next,jumper"
          :page-sizes="[10, 20, 50, 100]"
          :total="totalPageNum"
        ></el-pagination>
      </el-col>
    </el-row>
    <!-- 新增弹窗 -->
    <DialogInfo
      :flag.sync="dialogInfo"
      @close="close"
      :category="options.category"
      @getInfoList="getInfoList"
    />
    <!-- 编辑弹窗 -->
    <DialogEditInfo
      :flag.sync="dialogEditInfo"
      :id="infoId"
      @close="close"
      :category="options.category"
      @getInfoList="getInfoList"
    />
  </section>
</template>

<script>
import DialogInfo from "./dialog/info";
import DialogEditInfo from "./dialog/edit";
import { getList, deleteInfo } from "@/api/info";
import { common } from "@/api/common";
import { timestampToTime } from "@/utils/common";
import { reactive, onMounted, ref, watch } from "@vue/composition-api";
import SelectVue from "@c/select/";
export default {
  name: "infoIndex",
  components: { DialogInfo, DialogEditInfo, SelectVue },
  setup(props, { refs, root }) {
    const { categoryData, getInfoCateAll } = common();
    const searchKey = ref("id");
    const categoryValue = ref("");
    const dateValue = ref("");
    const searchKeyWord = ref("");
    const infoId = ref("");
    const dialogInfo = ref(false);
    const dialogEditInfo = ref(false);
    const totalPageNum = ref(0);
    const loading = ref(false);
    const deleteId = ref("");
    const options = reactive({ category: [] });
    const data = reactive({
      configOption: {
        init: ["id", "title"]
      }
    });
    // const data = reactive([
    //   {
    //     value: "id",
    //     label: "ID"
    //   },
    //   {
    //     value: "title",
    //     label: "标题"
    //   }
    // ]);
    const pagination = reactive({
      size: 10,
      currentPage: 1
    });
    const tableData = reactive({ item: [] });
    const close = () => {
      dialogInfo.value = false;
      dialogEditInfo.value = false;
    };
    const deleteItem = val => {
      root.confirm({
        msg: "此操作将永久删除该文件, 是否继续?",
        tip: "提示",
        fn: confirmDelete
      });
      deleteId.value = [val];
    };
    const deleteAll = () => {
      if (deleteId.value === "" || deleteId.value.length == 0) {
        root.$message({
          message: "请选择要删除的数据",
          type: "error"
        });
        return false;
      }
      root.confirm({
        msg: "此操作将删除全部文件, 是否继续?",
        fn: confirmDelete
      });
    };
    const confirmDelete = val => {
      deleteInfo({ id: deleteId.value })
        .then(response => {
          root.$message({
            message: response.message,
            type: "success"
          });
          deleteId.value = "";
          getInfoList();
        })
        .catch(err => {});
    };
    const formatData = () => {
      let requestData = {
        pageNumber: pagination.currentPage,
        pageSize: pagination.size
      };
      if (categoryValue.value) {
        requestData.categoryId = categoryValue.value;
      }
      if (dateValue.value.length > 0) {
        requestData.startTiem = dateValue.value[0];
        requestData.endTime = dateValue.value[1];
      }
      if (searchKeyWord.value) {
        requestData[searchKey.value] = searchKeyWord.value;
      }
      return requestData;
    };
    const getInfoList = () => {
      let requestData = formatData();
      loading.value = true;
      getList(requestData)
        .then(response => {
          tableData.item = response.data.data;
          totalPageNum.value = response.data.total;
          loading.value = false;
        })
        .catch(err => {
          loading.value = false;
        });
    };
    onMounted(() => {
      getInfoCateAll();
      getInfoList();
      // options.category = category.item;
    });
    watch(
      () => categoryData.item,
      value => {
        options.category = value;
      }
    );
    const handleCurrentChange = val => {
      pagination.currentPage = val;
      getInfoList();
    };
    const handleSizeChange = val => {
      pagination.size = val;
      getInfoList();
    };
    const toCategory = (row, column, cellValue) => {
      let categoryData = options.category.filter(
        item => item.id == row.categoryId
      )[0];
      return categoryData.category_name;
    };
    const toDate = (row, column, cellValue) => {
      return timestampToTime(row.createDate);
    };
    const handleSelectionChange = val => {
      // console.log("index.vue->216:\t", val);
      let selectedIds = val.map(item => item.id);
      deleteId.value = selectedIds;
    };
    const editInfo = val => {
      dialogEditInfo.value = true;
      infoId.value = val;
    };
    const detaild = params => {
      // root.$router.push({
      //   path: `InfoDetails/${params.id}/${params.title}`
      // });
      root.$store.commit("InfoDetails/SET_ID", params.id);
      root.$store.commit("InfoDetails/SET_TITLE", params.title);
      root.$router.push({
        name: "InfoDetails",
        params: {
          id: params.id,
          title: params.title
        }
      });
    };
    return {
      //ref
      totalPageNum,
      categoryValue,
      dateValue,
      searchKey,
      searchKeyWord,
      dialogInfo,
      loading,
      infoId,
      dialogEditInfo,
      //reactive
      options,
      data,
      tableData,
      //function
      deleteItem,
      deleteAll,
      close,
      handleSizeChange,
      handleCurrentChange,
      toCategory,
      toDate,
      handleSelectionChange,
      getInfoList,
      editInfo,
      detaild
    };
  }
};
</script>

<style scoped lang="scss">
.label-wrap {
  &.category {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(right, 93, 40);
  }
  &.key-word {
    @include labelDom(right, 99, 40);
  }
}
</style>
