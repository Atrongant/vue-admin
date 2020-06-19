<template>
  <section>
    <el-row :gutter="14">
      <el-col :span="3">
        <div class="label-wrap category">
          <label for>类型：</label>
          <div class="wrap-content">
            <el-select v-model="categoryValue" placeholder="请选择" style="width:100%;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
            ></el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <div class="label-wrap key-word">
          <label for>搜索：</label>
          <div class="wrap-content">
            <el-select v-model="searchKey" placeholder="请选择" style="width:100%;">
              <el-option
                v-for="item in searchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input v-model="searchKeyWord" placeholder="请输入内容" style="width:100%;"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width:100%;">搜索</el-button>
      </el-col>
      <el-col :span="3">&nbsp;</el-col>
      <el-col :span="2" class="pull-right">
        <el-button type="danger" style="width:100%;" @click="dialogInfo=true">新增</el-button>
      </el-col>
    </el-row>
    <div class="blank-space-30"></div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="title" label="标题" width="830"></el-table-column>
      <el-table-column prop="category" label="类别" width="130"></el-table-column>
      <el-table-column prop="date" label="日期" width="237"></el-table-column>
      <el-table-column prop="user" label="管理人" width="115"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteItem">删除</el-button>
          <el-button size="mini" type="success" @click="dialogInfo=true">编辑</el-button>
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
          class="pull-right"
          layout="total,sizes,prev, pager, next,jumper"
          :page-sizes="[10, 20, 50, 100]"
          :total="1000"
        ></el-pagination>
      </el-col>
    </el-row>
    <DialogInfo :flag.sync="dialogInfo" @close="close" />
  </section>
</template>

<script>
import DialogInfo from "./dialog/info";
import { reactive, onMounted, ref } from "@vue/composition-api";
export default {
  name: "infoIndex",
  components: { DialogInfo },
  setup(props, { refs, root }) {
    const searchKey = ref("id");
    const categoryValue = ref("");
    const dateValue = ref("");
    const searchKeyWord = ref("");
    const dialogInfo = ref(false);
    const options = reactive([
      {
        value: 1,
        label: "国际信息"
      },
      {
        value: 2,
        label: "国内信息"
      },
      {
        value: 3,
        label: "行业信息"
      }
    ]);
    const searchOptions = reactive([
      {
        value: "id",
        label: "ID"
      },
      {
        value: "title",
        label: "标题"
      }
    ]);

    const tableData = reactive([
      {
        date: "2019-09-10 19:31:31",
        user: "管理员",
        title: "纽约市长白思豪宣布退出总统竞选 特朗普发推回应",
        category: "国内信息"
      },
      {
        date: "2019-09-10 19:31:31",
        user: "管理员",
        title:
          "习近平在中央政协工作会议暨庆祝中国人民政治协商会议成立70周年大会上发表重要讲话",
        category: "国内信息"
      },
      {
        date: "2019-09-10 19:31:31",
        user: "管理员",
        title: '基里巴斯与台当局"断交" 系蔡当局上台后断交第7国',
        category: "国内信息"
      },
      {
        date: "2019-09-10 19:31:31",
        user: "管理员",
        title: "不选了！纽约市长白思豪宣布退出2020美国大选",
        category: "国内信息"
      }
    ]);
    const handleSizeChange = val => {};
    const handleCurrentChange = val => {};
    const close = () => {
      console.log("index.vue/164:\t", 999999);
      dialogInfo.value = false;
    };
    const deleteItem = () => {
      root.confirm({
        msg: "此操作将永久删除该文件, 是否继续?",
        tip: "提示",
        fn: confirmDelete,
        id: 11111
      });
    };
    const deleteAll = () => {
      root.confirm({
        msg: "此操作将删除全部文件, 是否继续?",
        fn: confirmDelete,
        id: 2222
      });
    };
    const confirmDelete = val => {
      console.log("index.vue/181:\t", val);
    };
    return {
      //ref
      categoryValue,
      dateValue,
      searchKey,
      searchKeyWord,
      dialogInfo,
      //reactive
      options,
      searchOptions,
      tableData,
      //function
      deleteItem,
      deleteAll,
      close
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
