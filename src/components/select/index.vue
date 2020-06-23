<template>
  <el-select placeholder="请选择" v-model="data.selectValue">
    <el-option
      :label="item.label"
      :value="item.value"
      :key="item.value"
      v-for="item in data.initOption"
    ></el-option>
  </el-select>
</template>

<script>
import { reactive, onMounted } from "@vue/composition-api";
export default {
  name: "index",
  props: {
    config: {
      type: Object,
      default: {}
    }
  },
  setup(props, { root }) {
    console.log("index.vue->23:\t", props.config);
    const data = reactive({
      selectValue: "",
      initOption: [],
      option: [
        { value: "name", label: "姓名" },
        { value: "phone", label: "手机号" },
        { value: "email", label: "邮箱" },
        { value: "id", label: "ID" },
        { value: "title", label: "标题" }
      ]
    });
    onMounted(() => {
      let arr = [];
      props.config.init.forEach(val => {
        let n = data.option.filter(item => item.value == val)[0];
        arr.push(n);
      });
      data.initOption = arr;
      console.log("index.vue->38:\t", arr);
      data.selectValue = data.initOption[0].value;
    });
    return {
      data
    };
  }
};
</script>

<style scoped lang="less">
</style>
