<template>
  <section>
    <el-row>
      <el-col :span="20">
        <div class="label-wrap">
          <label for>关键字:</label>
          <div class="wrap-content">
            <el-row :gutter="16">
              <el-col :span="3">
                <SelectVue :config="data.configOption" :selectData.sync="data.selectData" />
              </el-col>
              <el-col :span="5">
                <el-input placeholder="请输入内容" v-model="data.keyword"></el-input>
              </el-col>
              <el-col :span="15">
                <el-button type="danger" @click="search">搜索</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" class="pull-right" @click="data.addUserDialog=true">新增用户</el-button>
      </el-col>
    </el-row>
    <div class="blank-space-30"></div>
    <TableVue :config="data.configtTable" :tableRow.sync="data.tableRow" ref="userTable">
      <template v-slot:status="slotData">
        <el-switch
          v-model="slotData.data.status"
          active-value="2"
          inactive-value="1"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="handleSwitchChange(slotData.data)"
        ></el-switch>
      </template>
      <template v-slot:operation="slotData">
        <el-button type="danger" size="small" @click="singleDelete(slotData.data)">删除</el-button>
        <!--  <el-button
          type="success"
          size="small"
          @click="operate({columnData:slotData.data,type:'edit'})"
        >编辑</el-button>-->
      </template>
      <template v-slot:tableFooterLeft>
        <el-button size="small" @click="batchDelete">批量删除</el-button>
      </template>
    </TableVue>
    <DialogAddUser :flag.sync="data.addUserDialog" @close="close" @refresh="refreshTable" />
  </section>
</template>

<script>
import { reactive, ref } from "@vue/composition-api";
import SelectVue from "@c/select/";
import TableVue from "@c/table";
import DialogAddUser from "./dialog/add";
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
  components: { SelectVue, TableVue, DialogAddUser },
  setup(props, { root, refs }) {
    const data = reactive({
      tableRow: {},
      keyword: "",
      addUserDialog: false,
      selectData: {},
      configOption: {
        init: ["name", "phone"]
      },
      configtTable: {
        selection: true,
        tHead: [
          {
            label: "邮箱/用户名",
            field: "username",
            width: 200
          },
          {
            label: "真实姓名",
            field: "truename",
            width: 150
          },
          {
            label: "手机号",
            field: "phone"
          },
          {
            label: "地区",
            field: "region"
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
      let columnData = params.data;
      let type = params.type;
      if (type === "edit") {
      } else if (type === "delete") {
        let requestData = {
          id: []
        };
      }
    };
    let addAUser = () => {
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
        .then(response => {})
        .catch(err => {});
    };
    const close = () => {
      data.addUserDialog = false;
    };
    const batchDelete = () => {
      let userId = data.tableRow.idItem;
      if (!userId || userId.length === 0) {
        root.$message({
          message: "请勾选需要删除的数据",
          type: "error"
        });
        return false;
      }
      userDelete();
    };
    const userDelete = () => {
      deleteUser({ id: data.tableRow.idItem })
        .then(response => {
          root.$message({
            message: response.message,
            type: "success"
          });
          refreshTable();
        })
        .catch(err => {});
    };
    const refreshTable = () => {
      refs.userTable.refreshTable();
    };
    const singleDelete = params => {
      data.tableRow.idItem = [params.id];
      userDelete();
    };
    const switchStatus = ref(false);
    const handleSwitchChange = params => {
      if (switchStatus.value) return false;
      switchStatus.value = true;
      activeUser({ id: params.id, status: params.status })
        .then(response => {
          root.$message({
            message: response.message,
            type: "success"
          });
          switchStatus.value = false;
        })
        .catch(err => {
          switchStatus.value = false;
        });
    };
    const search = () => {
      let requestData = {
        [data.selectData.value]: data.keyword
      };
      console.log("index.vue->204:\t", requestData);
      refs.userTable.paramLoadData(requestData);
    };
    return {
      data,
      operate,
      addAUser,
      close,
      batchDelete,
      singleDelete,
      refreshTable,
      handleSwitchChange,
      search
    };
  }
};
</script>

<style scoped lang="scss">
.label-wrap {
  @include labelDom(right, 99, 40);
}
</style>
