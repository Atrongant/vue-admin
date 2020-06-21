<template>
  <el-form :model="formData" ref="ruleForm" label-width="120px" class="demo-ruleForm">
    <el-form-item label="信息分类：" prop="category">
      <el-select v-model="formData.category" placeholder="请选择分类">
        <el-option
          :label="item.category_name"
          :value="item.id"
          v-for="item in options.category"
          :key="item.id"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="新闻标题:" prop="title">
      <el-input v-model="formData.title"></el-input>
    </el-form-item>
    <el-form-item label="缩略图：" prop="title">缩略图：</el-form-item>
    <el-form-item label="发布日期:" prop="createDate">
      <el-date-picker v-model="formData.createDate" type="date" placeholder="选择日期" disabled></el-date-picker>
    </el-form-item>
    <el-form-item label="详细内容：" prop="content">
      <template>
        <quillEditor
          v-model="formData.content"
          ref="myQuillEditor"
          :options="formData.editorOption"
        />
      </template>
      <!-- <el-input v-model="formData.content"></el-input> -->
    </el-form-item>
    <el-form-item>
      <el-button type="danger" @click="submit" :loading="sumbitLoadingState">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { ref, reactive, onMounted, watch } from "@vue/composition-api";
import { common } from "@/api/common";
import { getList, editInfo } from "@/api/info";
import { timestampToTime } from "@/utils/common";
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  name: "detail",
  components: { quillEditor },
  setup(props, { root }) {
    let idx =
      root.$route.params.id || root.$store.getters["InfoDetails/infoId"];
    const { categoryData, getInfoCateAll } = common();
    const categoryValue = ref("");
    const sumbitLoadingState = ref(false);
    const options = reactive({ category: [] });
    const formData = reactive({
      category: "",
      title: "",
      imgUrl: "",
      createDate: "",
      content: "",
      editorOption: {}
    });
    onMounted(() => {
      getInfoCateAll();
      getInfo();
    });
    watch(
      () => categoryData.item,
      value => (options.category = value)
    );
    const getInfo = () => {
      let requestData = {
        pageNumber: 1,
        pageSize: 1,
        id: idx
      };
      getList(requestData)
        .then(response => {
          console.log("detail.vue->64:\t", response);
          let data = response.data.data[0];
          formData.title = data.title;
          formData.category = data.categoryId;
          formData.content = data.content;
          formData.createDate = toDate(data.createDate);
        })
        .catch(err => {
          loading.value = false;
        });
    };
    const toDate = value => {
      return timestampToTime(value);
    };
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
        id: idx,
        categoryId: formData.category,
        title: formData.title,
        content: formData.content
        // createDate:"",
        // imgUrl:"",
      };
      editInfo(requestData)
        .then(response => {
          root.$message({
            message: response.message,
            type: "success"
          });
          sumbitLoadingState.value = false;
        })
        .catch(err => {
          sumbitLoadingState.value = false;
        });
    };
    return {
      //ref
      sumbitLoadingState,
      //reactive
      options,
      formData,
      //function
      submit
    };
  }
};
</script>

<style scoped lang="less">
</style>
