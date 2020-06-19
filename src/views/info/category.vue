<template>
  <section id="category">
    <el-button type="danger">添加一级分类</el-button>
    <hr class="hr-e9" />
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category">
            <h4>
              <svg-icon iconClass="minus" class="minus" />新闻
              <div class="button-group">
                <el-button type="danger" round size="mini">编辑</el-button>
                <el-button type="success" round size="mini">添加子级</el-button>
                <el-button round size="mini">删除</el-button>
              </div>
            </h4>
            <ul>
              <li>
                国内
                <div class="button-group">
                  <el-button type="danger" round size="mini">编辑</el-button>
                  <el-button round size="mini">删除</el-button>
                </div>
              </li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
            </ul>
          </div>
          <div class="category">
            <h4>
              <svg-icon iconClass="minus" class="minus" />新闻
            </h4>
            <ul>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
            </ul>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类编辑</h4>
          <el-form :model="form" label-width="142px" class="form-wrap">
            <el-form-item label="一级分类名称">
              <el-input v-model="form.categoryName"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称">
              <el-input v-model="form.setCategoryName"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger" @click="submit">确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import { reactive } from "@vue/composition-api";
import { addFirstCategory } from "@/api/news";
export default {
  name: "infoCategory",
  setup(props, { root }) {
    const form = reactive({
      categoryName: "",
      setCategoryName: ""
    });
    const submit = () => {
      let requestData = {
        categoryName:form.categoryName
      };
      console.log('category.vue/79:\t',requestData);
      addFirstCategory(requestData)
        .then(response => {
          console.log("category.vue/78:\t", response);
        })
        .catch(err => {
          console.log("category.vue/80:\t", err);
        });
    };
    return {
      form,
      submit
    };
  },
  components: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>

<style scoped lang="scss">
@import "../../styles/config.scss";
.category {
  position: relative;
  line-height: 44px;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    left: 22px;
    top: 0;
    bottom: 0;
    width: 32px;
    border-left: 1px dotted #000;
  }
  &:first-of-type {
    &::before {
      top: 20px;
    }
  }
  &:last-of-type {
    &::before {
      bottom: 22px;
    }
  }
  h4 {
    position: relative;
    padding-left: 40px;
  }
  svg {
    position: absolute;
    left: 14px;
    top: 15px;
    background-color: #fff;
    font-size: 17px;
  }
  li {
    position: relative;
    padding-left: 36px;
    margin-left: 24px;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 21px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }
  li,
  h4 {
    &:hover {
      @include webkit(transition, all 0.5s ease 0s);
      background-color: #f3f3f3;
      .button-group {
        display: block;
      }
    }
  }
}
.button-group {
  display: none;
  position: absolute;
  right: 11px;
  z-index: 2;
  top: -1px;
  button {
    font-size: 12px;
  }
}
.menu-title {
  line-height: 44px;
  padding-left: 22px;
  background-color: #f3f3f3;
}
.form-wrap {
  width: 410px;
  padding-top: 26px;
}
.hr-e9 {
  width: calc(100% + 60px);
  margin-left: -30px;
  margin-top: 30px;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #e9e9e9;
}
</style>
