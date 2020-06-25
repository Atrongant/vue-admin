<template>
  <el-select placeholder="请选择" v-model="selectValue">
    <el-option :label="item.label" :value="item.value" :key="item.value" v-for="item in initOption"></el-option>
  </el-select>
</template>

<script>
// import { reactive, onMounted } from "@vue/composition-api";
export default {
  name: "index",
  props: {
    config: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      selectValue: "",
      initOption: [],
      option: [
        { value: "name", label: "姓名" },
        { value: "phone", label: "手机号" },
        { value: "email", label: "邮箱" },
        { value: "id", label: "ID" },
        { value: "title", label: "标题" }
      ]
    };
  },
  methods: {
    initOptions() {
      let arr = [];
      this.config.init.forEach(val => {
        let n = this.option.filter(item => item.value == val)[0];
        arr.push(n);
      });
      this.initOption = arr;
      this.selectValue = this.initOption[0].value;
    }
  },
  watch: {
    config: {
      handler(newValue, oldValue) {
        // this.config=
        this.initOptions();
      },
      immediate: true
    }
  }
};
</script>

<style scoped lang="less">
</style>
