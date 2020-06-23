<template>
  <section>
    <el-row>
      <el-col :span="20">
        <div class="label-wrap">
          <label for>关键字:</label>
          <div class="wrap-content">
            <el-row :gutter="16">
              <el-col :span="3">
                <SelectVue :config="data.configOption" />
              </el-col>
              <el-col :span="5">
                <el-input placeholder="请输入内容"></el-input>
              </el-col>
              <el-col :span="15">
                <el-button type="danger">搜索</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" class="pull-right" @click="addAUser">新增用户</el-button>
      </el-col>
    </el-row>
    <div class="blank-space-30"></div>
    <TableVue :config="data.configtTable">
      <template v-slot:status="slotData">
        <el-switch active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </template>
      <template v-slot:operation="slotData">
        <el-button
          type="danger"
          size="small"
          @click="operate({columnData:slotData.data,type:'delete'})"
        >删除</el-button>
        <el-button
          type="success"
          size="small"
          @click="operate({columnData:slotData.data,type:'edit'})"
        >编辑</el-button>
      </template>
    </TableVue>
  </section>
</template>

<script>
import { reactive } from "@vue/composition-api";
import SelectVue from "@c/select/";
import TableVue from "@c/table";
import {
  getList,
  addUser,
  deleteUser,
  editUser,
  activeUser,
  userRoles
} from "@/api/user.js";
export default {
  name: "userIndex",
  components: { SelectVue, TableVue },
  setup(props) {
    const data = reactive({
      configOption: {
        init: ["name", "phone"]
      },
      configtTable: {
        selection: true,
        tHead: [
          {
            label: "邮箱/用户名",
            field: "email",
            width: 200
          },
          {
            label: "真实姓名",
            field: "name",
            width: 150
          },
          {
            label: "手机号",
            field: "phone"
          },
          {
            label: "地区",
            field: "address"
          },
          {
            label: "角色",
            field: "role"
          },
          {
            label: "禁启用状态",
            field: "status",
            columnType: "slot",
            slotName: "status"
          },
          {
            label: "操作",
            columnType: "slot",
            slotName: "operation"
          }
        ],
        requestData: {
          requestUrl: "/user/getList/",
          data: {
            username: "",
            truename: "",
            phone: "",
            pageNumber: 1,
            pageSize: 10
          }
        }
      }
    });
    let operate = params => {
      console.log("index.vue->100:\t", params);
      let columnData = params.data;
      let type = params.type;
      if (type === "edit") {
      } else if (type === "delete") {
        let requestData = {
          id: []
        };
        console.log("index.vue->107:\t", columnData);
      }
    };
    let addAUser = () => {
      console.log("index.vue->129:\t", 129);
      let requestData = {
        username: "1234789012345",
        truename: "123455",
        password: "123455",
        phone: "1234789012345",
        region: "123455",
        status: "123455",
        role: "123455"
      };
      addUser(requestData)
        .then(response => {
          console.log("index.vue->139:\t", response);
        })
        .catch(err => {
          console.log("index.vue->141:\t", err);
        });
    };
    return {
      data,
      operate,
      addAUser
    };
  }
};
</script>

<style scoped lang="scss">
.label-wrap {
  @include labelDom(right, 99, 40);
}
</style>
