<template>
  <section id="category">
    <el-button type="danger" @click="addFirst({type:'parentAdd'})">添加一级分类</el-button>
    <hr class="hr-e9" />
    <div>
      <el-row :gutter="30">
        <el-col :span="8">
          <div class="category" v-for="item in category.item" :key="item.id">
            <h4>
              <svg-icon iconClass="minus" class="minus" />
              {{item.category_name}}
              <div class="button-group">
                <el-button
                  type="danger"
                  round
                  size="mini"
                  @click="editFirst({data:item,type:'editParent'})"
                >编辑</el-button>
                <el-button
                  type="success"
                  round
                  size="mini"
                  @click="addChild({data:item,type:'addChild'})"
                >添加子级</el-button>
                <el-button round size="mini" @click="deleteConfirm(item.id)">删除</el-button>
              </div>
            </h4>
            <ul v-if="item.children">
              <li v-for="child in item.children" :key="child.id">
                {{child.category_name}}
                <div class="button-group">
                  <el-button
                    type="danger"
                    round
                    size="mini"
                    @click="editChild({parent:item,data:child})"
                  >编辑</el-button>
                  <el-button round size="mini" @click="deleteChild({parent:item,data:child})">删除</el-button>
                </div>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="16">
          <h4 class="menu-title">一级分类编辑</h4>
          <el-form :model="form" label-width="142px" class="form-wrap">
            <el-form-item label="一级分类名称" v-if="showParentCateState">
              <el-input v-model="form.categoryName" :disabled="parentCateDisabledState"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称" v-if="showChildCateState">
              <el-input v-model="form.childCategoryName" :disabled="childCateDisabledState"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                @click="submit"
                :loading="btnLoadingState"
                :disabled="btnDisabledState"
              >确定</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
import {
  addFirstCategory,
  getCategoryAll,
  getCategory,
  deleteCategory,
  editCategory,
  addChildrenCategory
} from "@/api/news";
import { common } from "@/api/common";
export default {
  name: "infoCategory",
  setup(props, { root }) {
    const { categoryData, getInfoCateAll } = common();
    const showParentCateState = ref(true);
    const showChildCateState = ref(true);
    const btnLoadingState = ref(false);
    const parentCateDisabledState = ref(true);
    const childCateDisabledState = ref(true);
    const btnDisabledState = ref(true);
    const deleteId = ref("");
    const submitType = ref("");
    const form = reactive({
      categoryName: "",
      childCategoryName: ""
    });
    let category = reactive({ item: [], current: [] });
    /* 提交按钮触发 */
    const submit = () => {
      if (!form.categoryName) {
        root.$message({
          message: "分类名称不能为空",
          type: "error"
        });
        return false;
      }
      btnLoadingState.value = true;
      if (submitType.value === "parentAdd") {
        parentCateAdd();
      }
      if (submitType.value === "editParent") {
        editParentCate();
      }
      if (submitType.value === "addChild") {
        addChildCate();
      }
    };
    const addChildCate = () => {
      let requestData = {
        parentId: category.current.id,
        categoryName: form.childCategoryName
      };
      addChildrenCategory(requestData)
        .then(response => {
          root.$message({
            message: response.message,
            type: "success"
          });
          let idx = category.item.findIndex(
            item => item.id == category.current.id
          );
          category.item[idx].children.push(response.data);
          resetForm();
        })
        .catch(err => {
          resetForm();
        });
    };
    /* 添加子级时触发 */
    const addChild = params => {
      showParentCateState.value = true; //显示第一个文本框
      showChildCateState.value = true; //显示第二个文本框
      parentCateDisabledState.value = true; //禁用第一个文本框
      childCateDisabledState.value = false; //启用第二个文本框
      btnDisabledState.value = false; //启用提交按钮
      form.categoryName = params.data.category_name; //设置第一个文本框的默认文字
      category.current = params.data; //将数据放到current里
      submitType.value = params.type; //更改提交类型
    };
    /* 编辑一级分类按钮触发 */
    const editFirst = params => {
      submitType.value = params.type;
      form.categoryName = params.data.category_name;
      category.current = params.data;
      resetParentDomState();
    };
    /* 编辑一级分类 */
    const editParentCate = params => {
      // {data:item,type:'editParent'}
      let requestData = {
        id: category.current.id,
        categoryName: form.categoryName
      };
      editCategory(requestData)
        .then(response => {
          root.$message({
            message: response.message,
            type: "success"
          });
          // let idx = category.item.findIndex(
          //   item => item.id == category.current.id
          // );
          // category.item[idx].category_name = form.categoryName;
          category.current.category_name = form.categoryName;
          // submitType.value = "";
          // form.categoryName = "";
          // btnLoadingState.value = false;
          resetForm();
          category.current = [];
        })
        .catch(err => {
          // submitType.value = "";
          // form.categoryName = "";
          // btnLoadingState.value = false;
          resetForm();
        });
    };
    /* 添加一级分类：后台请求，状态重置等 */
    const parentCateAdd = () => {
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
          category.item.push(response.data);
          resetForm();
        })
        .catch(err => {
          // form.childCategoryName = "";
          // submitType.value = "";
          // form.categoryName = "";
          resetForm();
        });
    };
    /* 添加一级分类按钮触发 */
    const addFirst = params => {
      form.categoryName = "";
      submitType.value = params.type;
      resetParentDomState();
    };
    /* 提交一级分类表单以后重置表单 */
    const resetForm = () => {
      btnLoadingState.value = false;
      showParentCateState.value = true;
      showChildCateState.value = true;
      parentCateDisabledState.value = true;
      childCateDisabledState.value = true;
      btnDisabledState.value = true;
      form.childCategoryName = "";
      submitType.value = "";
      form.categoryName = "";
    };
    /* 编辑，新增一级分类时页面初始dom元素的状态 */
    const resetParentDomState = () => {
      showParentCateState.value = true; //显示第一个文本框
      showChildCateState.value = false; //隐藏第二个文本框
      parentCateDisabledState.value = false; //启用第一个文本框
      btnDisabledState.value = false; //启用提交按钮
    };
    /* 获取全部分类后台请求*/
    const getCateAll = () => {
      getCategoryAll({})
        .then(response => {
          category.item = response.data;
        })
        .catch(err => {});
    };
    /* 删除按钮触发确认删除操作 */
    const deleteConfirm = id => {
      deleteId.value = id;
      root.confirm({
        msg: "此操作将删除数据, 是否继续?",
        fn: deleteItem,
        cancelFn: () => {
          deleteId.value = "";
        }
      });
    };
    /* 向后台发送删除delete请求，并刷新页面显示数据 */
    const deleteItem = () => {
      deleteCategory({ categoryId: deleteId.value })
        .then(response => {
          // category.item
          root.$message({
            message: response.message,
            type: "success"
          });
          let idx = category.item.findIndex(item => item.id == deleteId.value);
          category.item.splice(idx, 1);
        })
        .catch(err => {});
    };

    onMounted(() => {
      // getCateAll();
      getInfoCateAll();
    });
    watch(
      () => categoryData.item,
      value => {
        category.item = value;
      }
    );
    const deleteChild = params => {
      let child = params.data;
      let parent = params.parent;
    };
    const editChild = params => {
      let child = params.data;
      let parent = params.parent;
    };
    return {
      //ref
      showParentCateState,
      showChildCateState,
      btnLoadingState,
      parentCateDisabledState,
      childCateDisabledState,
      btnDisabledState,
      //reactive
      form,
      category,
      //function
      submit,
      addFirst,
      deleteItem,
      deleteConfirm,
      editFirst,
      addChild,
      editChild,
      deleteChild
    };
  }
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
