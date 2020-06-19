<template>
  <el-dialog title="新增" :visible.sync="dialogState" @close="close" width="580px">
    <el-form :model="form">
      <el-form-item label="类型：" :label-width="formLabelWidth">
        <el-select v-model="form.category" placeholder="请选择">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：" :label-width="formLabelWidth">
        <el-input v-model="form.title" auto-complete="off" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="概况：" :label-width="formLabelWidth">
        <el-input type="textarea" v-model="form.desc" placeholder="请输入内容"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close = false">取消</el-button>
      <el-button type="danger" @click="dialogFormVisible = false">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { ref, reactive, watchEffect } from "@vue/composition-api";
export default {
  name: "info",
  props: {
    flag: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const dialogState = ref(true);
    const formLabelWidth = ref("70px");
    const form = reactive({
      title: "",
      category: "",
      desc: ""
    });
    const close = () => {
      console.log("info.vue/21:\t", 8888);
      dialogState.value = false;
      emit("close", false);
      //   this.$emit("update:flag", false);
    };
    watchEffect(() => {
      dialogState.value = props.flag;
    });
    return {
      //ref
      dialogState,
      formLabelWidth,
      //reactive
      form,
      //function
      close
    };
  }
};
</script>

<style scoped lang="less">
</style>
