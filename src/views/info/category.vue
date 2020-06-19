<template>
  <section id="category">
    <el-button type="danger" @click="addFirst">添加一级分类</el-button>
    <hr class="hr-e9" />
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category" v-for="item in category.item" :key="item.id">
            <h4>
              <svg-icon iconClass="minus" class="minus" />
              {{item.category_name}}
              <div class="button-group">
                <el-button type="danger" round size="mini">编辑</el-button>
                <el-button type="success" round size="mini">添加子级</el-button>
                <el-button round size="mini">删除</el-button>
              </div>
            </h4>
            <ul v-if="item.children">
              <li v-for="child in item.children" :key="child.id">
                {{child.category_name}}
                <div class="button-group">
                  <el-button type="danger" round size="mini">编辑</el-button>
                  <el-button round size="mini">删除</el-button>
                </div>
              </li>
              <!-- <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>-->
            </ul>
          </div>
          <!--  <div class="category">
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
          </div>-->
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类编辑</h4>
          <el-form :model="form" label-width="142px" class="form-wrap">
            <el-form-item label="一级分类名称" v-if="categoryState">
              <el-input v-model="form.categoryName"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称" v-if="childState">
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
import { reactive, ref, onMounted } from "@vue/composition-api";
import { addFirstCategory, getCategoryAll, getCategory } from "@/api/news";
export default {
  name: "infoCategory",
  setup(props, { root }) {
    const categoryState = ref(true);
    const childState = ref(true);
    const form = reactive({
      categoryName: "",
      setCategoryName: ""
    });
    let category = reactive({item:[]});
    // reactive([
    //   {
    //     id: "1",
    //     category_name: "国际信息",
    //     children: [
    //       {
    //         id: "11",
    //         category_name: "国际信息1-1"
    //       },
    //       {
    //         id: "12",
    //         category_name: "国际信息1-2"
    //       },
    //       {
    //         id: "13",
    //         category_name: "国际信息1-3"
    //       }
    //     ]
    //   },
    //   {
    //     id: "2",
    //     category_name: "国内信息",
    //     children: [
    //       {
    //         id: "21",
    //         category_name: "国内信息2-1"
    //       },
    //       {
    //         id: "22",
    //         category_name: "国内信息2-2"
    //       },
    //       {
    //         id: "23",
    //         category_name: "国内信息2-3"
    //       }
    //     ]
    //   }
    // ]);
    const submit = () => {
      if (!form.categoryName) {
        root.$message({
          message: "分类名称不能为空",
          type: "error"
        });
        return false;
      }
      let requestData = {
        categoryName: form.categoryName
      };
      addFirstCategory(requestData)
        .then(response => {
          if (response.resCode === 0) {
            root.$message({
              message: response.message,
              type: "success"
            });
          }
        })
        .catch(err => {});
    };
    const addFirst = () => {
      categoryState.value = true;
      childState.value = false;
    };
    const getCateAll = () => {
      getCategoryAll({})
        .then(response => {
          console.log("category.vue->147:\t", response.data);
          category.item = response.data;
          console.log("category.vue->149:\t", category.item);
        })
        .catch(err => {});
      // getCategoryAll({})
      //   .then(response => {
      //     console.log("category.vue->151:\t", response.data);
      //   })
      //   .catch(err => {});
    };
    onMounted(() => {
      getCateAll();
    });
    return {
      //ref
      categoryState,
      childState,
      //reactive
      form,
      category,
      //function
      submit,
      addFirst
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
