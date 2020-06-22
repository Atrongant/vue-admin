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
    <el-form-item label="缩略图：" prop="title">
      <el-upload
        class="avatar-uploader"
        action="http://up.qiniup.com"
        :data="formData.imgKey"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :on-error="handleAvatarError"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="formData.imgUrl" :src="formData.imgUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
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
import { common, uploadImgToken } from "@/api/common";
import { getList, editInfo } from "@/api/info";
import { timestampToTime } from "@/utils/common";
import { quillEditor } from "vue-quill-editor";
import QiniuUPToken from "qiniu-uptoken";
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
      editorOption: {},
      imgKey: {
        token: "",
        key: ""
      }
    });
    onMounted(() => {
      getInfoCateAll();
      getInfo();
      getImgToken();
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
          console.log("detail.vue->99:\t", response);
          let data = response.data.data[0];
          formData.title = data.title;
          formData.category = data.categoryId;
          formData.imgUrl = data.imgUrl;
          formData.content = data.content;
          formData.createDate = toDate(data.createDate);
          console.log("detail.vue->106:\t", formData);
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
        content: formData.content,
        imgUrl: formData.imgUrl
      };
      console.log("detail.vue->145:\t", requestData);
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
    const handleAvatarSuccess = (res, file) => {
      // formData.imageUrl = URL.createObjectURL(file.raw);
      console.log("detail.vue->157:\t", res);
      let imgUrl = `http://aaaa.mywen.club/${res.key}`;
      formData.imgUrl = imgUrl;
      console.log("detail.vue->164:\t", formData);
    };
    const handleAvatarError = (res, file) => {
      console.log("detail.vue->163:\t", res);
    };
    const beforeAvatarUpload = file => {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        root.$message.error("上传图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        root.$message.error("上传图片大小不能超过 2MB!");
      }
      /* 文件名转码 */
      let suffix = file.name;
      let key = encodeURI(`${suffix}`);
      formData.imgKey.key = key;
      return isJPG && isLt2M;
    };
    const getImgToken = () => {
      let accessKey = "DRHJy3ic_-DAjf753qzx9QDF18MaU34o6EjBiWPD";
      let secretKey = "zifm_AC8Mk6r-bAMvqFr8rV6WHhq0k_hA5zQkWpy";
      let buckety = "anki4ant";
      let uptoken = QiniuUPToken(accessKey, secretKey, buckety);
      formData.imgKey.token = uptoken;
      // uploadImgToken(requestData)
      //   .then(response => {
      //     console.log("detail.vue->171:\t", response);
      //     formData.imgKey.token = response.data.token;
      //     console.log("detail.vue->176:\t", formData.imgKey);
      //   })
      //   .catch(err => {
      //     console.log("detail.vue->173:\t", err);
      //   });
    };
    return {
      //ref
      sumbitLoadingState,
      //reactive
      options,
      formData,
      //function
      submit,
      handleAvatarSuccess,
      beforeAvatarUpload,
      handleAvatarError
    };
  }
};
</script>

<style scoped lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
