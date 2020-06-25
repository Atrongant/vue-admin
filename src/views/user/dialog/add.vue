<template>
  <el-dialog title="新增" :visible.sync="dialogState" @close="close" width="700px" @open="openDialog">
    <el-form :model="data.formData" ref="addUserForm">
      <el-form-item label="用户名：" :label-width="data.formLabelWidth" prop="username">
        <el-input v-model="data.formData.username" auto-complete="off" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="密码：" :label-width="data.formLabelWidth" prop="password">
        <el-input v-model="data.formData.password" auto-complete="off" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="姓名：" :label-width="data.formLabelWidth" prop="truename">
        <el-input v-model="data.formData.truename" auto-complete="off" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="手机号：" :label-width="data.formLabelWidth" prop="phone">
        <el-input v-model.number="data.formData.phone" auto-complete="off" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="地区：" :label-width="data.formLabelWidth" prop="region">
        <CityPicker :cityPickData.sync="data.cityPickData" />
      </el-form-item>
      <el-form-item label="是否启用：" :label-width="data.formLabelWidth" prop="status">
        <el-radio label="1" v-model="data.formData.status">禁用</el-radio>
        <el-radio label="2" v-model="data.formData.status">启用</el-radio>
      </el-form-item>
      <el-form-item label="角色：" :label-width="data.formLabelWidth" prop="role">
        <el-checkbox-group v-model="data.formData.role">
          <el-checkbox
            :label="item.role"
            name="type"
            :key="item.role"
            v-for="item in data.roleItems"
          >{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取消</el-button>
      <el-button type="danger" :loading="sumbitLoadingState" @click="submit">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { ref, reactive, watchEffect, onMounted } from "@vue/composition-api";
import { addInfo } from "@/api/info";
import CityPicker from "@c/cityPicker";
import { getRole } from "@/api/role";
import { addUser } from "@/api/user";
export default {
  name: "info",
  props: {
    flag: {
      type: Boolean,
      default: false
    },
    category: {
      type: Array,
      default: () => []
    }
  },
  components: { CityPicker },
  setup(props, { emit, root, refs }) {
    const data = reactive({
      roleItems: [],
      formLabelWidth: "90px",
      formData: {
        username: "402635876@qq.com",
        password: "123456",
        truename: "mayiwen",
        phone: "13345544725",
        region: "",
        status: "2",
        role: []
      },
      cityPickData: {}
    });
    const dialogState = ref(true);
    const sumbitLoadingState = ref(false);
    /* 提交表单 */
    const submit = () => {
      sumbitLoadingState.value = true;
      let requestData = JSON.parse(JSON.stringify(data.formData));
      requestData.role = requestData.role.join();
      requestData.region = JSON.stringify(data.cityPickData);
      addUser(requestData)
        .then(response => {
          root.$message({
            message: response.message,
            type: "success"
          });
          sumbitLoadingState.value = false;
          resetFormFields();
          emit("refresh");
          close();
        })
        .catch(err => {
          // resetFormFields();
          sumbitLoadingState.value = false;
        });
    };
    /* 重置表单 */
    const resetFormFields = () => {
      // refs.addUserForm.resetFormFields();
      data.cityPickData = {};
      data.formData.role = [];
      data.formData.region = "";
    };
    /* 弹窗关闭触发 */
    const close = () => {
      dialogState.value = false;
      emit("close", false);
      //   this.$emit("update:flag", false);
    };
    /* 获取全部角色 */
    const getAllRole = () => {
      getRole()
        .then(response => {
          data.roleItems = response.data;
        })
        .catch(err => {});
    };
    /* 打开弹窗时触发 */
    const openDialog = () => {
      getAllRole();
    };
    watchEffect(() => {
      dialogState.value = props.flag;
    });
    return {
      //ref
      data,
      dialogState,
      sumbitLoadingState,
      //function
      close,
      openDialog,
      submit
    };
  }
};
</script>

<style scoped lang="less">
</style>
