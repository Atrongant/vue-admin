<template>
  <el-dialog title="新增" :visible.sync="dialogState" @close="close" width="580px" @open="openDialog">
    <el-form :model="formData" ref="addInfoForm">
      <el-form-item label="类型：" :label-width="formLabelWidth" prop="category">
        <el-select v-model="formData.category" placeholder="请选择">
          <el-option
            :label="item.category_name"
            :value="item.id"
            v-for="item in categoryArr.item"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：" :label-width="formLabelWidth" prop="title">
        <el-input v-model="formData.title" auto-complete="off" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="概况：" :label-width="formLabelWidth" prop="desc">
        <el-input type="textarea" v-model="formData.desc" placeholder="请输入内容"></el-input>
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
  setup(props, { emit, root, refs }) {
    const dialogState = ref(true);
    const sumbitLoadingState = ref(false);
    const formLabelWidth = ref("70px");
    const categoryArr = reactive({ item: [] });
    const formData = reactive({
      title: "",
      category: "",
      desc: ""
    });
    /* 提交表单 */
    const submit = () => {
      if (formData.category === "") {
        root.$message({
          message: "分类名称不能为空",
          type: "error"
        });
        return false;
      }
      if (formData.title === "") {
        root.$message({
          message: "标题不能为空",
          type: "error"
        });
        return false;
      }
      if (formData.desc === "") {
        root.$message({
          message: "概况不能为空",
          type: "error"
        });
        return false;
      }
      sumbitLoadingState.value = true;
      let requestData = {
        categoryId: formData.category,
        title: formData.title,
        content: formData.desc
        // createDate:"",
        // imgUrl:"",
      };
      addInfo(requestData)
        .then(response => {
          root.$message({
            message: response.message,
            type: "success"
          });
          sumbitLoadingState.value = false;
          resetFormFields();
          emit("getInfoList");
          refs.addInfoForm.resetFields();
        })
        .catch(err => {
          sumbitLoadingState.value = false;
          refs.addInfoForm.resetFields();
        });
    };
    /* 重置表单 */
    const resetFormFields = () => {
      formData.title = "";
      formData.category = "";
      formData.desc = "";
    };
    /* 弹窗关闭触发 */
    const close = () => {
      dialogState.value = false;
      emit("close", false);
      //   this.$emit("update:flag", false);
    };
    /* 打开弹窗时触发 */
    const openDialog = () => {
      categoryArr.item = props.category;
    };
    watchEffect(() => {
      dialogState.value = props.flag;
    });
    return {
      //ref
      dialogState,
      formLabelWidth,
      sumbitLoadingState,
      //reactive
      formData,
      categoryArr,
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
