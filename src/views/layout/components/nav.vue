<template>
  <section class="nav" id="nav-wrap">
    <h1 class="logo">
      <img src="../../../assets/images/logo.png" alt />
    </h1>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="item in routers">
        <el-submenu :index="item.path" :key="item.id" v-if="!item.hidden">
          <!-- 一级菜单 -->
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
            <span slot="title">{{item.meta.name}}</span>
          </template>
          <!-- 子级菜单 -->
          <el-menu-item
            :index="subItem.path"
            v-for="subItem in item.children"
            :key="subItem.id"
          >{{subItem.meta.name}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </section>
</template>

<script>
import { ref, reactive, computed } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { root }) {
    /* data */
    const routers = reactive(root.$router.options.routes);
    /* 监听值变化 */
    const isCollapse = computed(() => root.$store.state.app.isCollapse);

    return {
      isCollapse,
      routers
    };
  }
};
</script>

<style scoped lang="scss">
@import "../../../styles/config.scss";
#nav-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
  svg {
    font-size: 20px;
    margin-right: 10px;
    color: #fff;
  }
  @include webkit(transition, all 0.3s ease 0s);
}
.logo {
  img {
    width: 92px;
    margin: auto;
    @include webkit(transition, all 0.3s ease 0s);
  }
}
.open {
  #nav-wrap {
    width: $navMenu;
  }
}
.close {
  #nav-wrap {
    width: $navMenuMin;
  }
  .logo {
    img {
      width: 70%;
    }
  }
}
</style>
