<template>
  <section id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuState">
      <svg-icon iconClass="menu" class="menu" />
    </div>
    <div class="pull-right">
      <div class="user-info pull-left">
        <img src="../../../assets/images/face.jpg" alt />
        <span>{{username}}</span>
      </div>

      <div class="header-icon pull-left" @click="exit">
        <svg-icon iconClass="quit" class="quit" />
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from "@vue/composition-api";
export default {
  name: "layoutHeader",
  setup(props, { root }) {
    const navMenuState = () => {
      root.$store.commit("app/SET_COLLAPSE");
    };
    const username = computed(() => root.$store.state.app.username);
    const exit = () => {
      root.$store.dispatch("app/exit").then(()=>{
          root.$router.push({
            name:"login"
          })
      });
    };
    return {
      navMenuState,
      username,
      exit
    };
  }
};
</script>

<style scoped lang="scss">
@import "../../../styles/config.scss";
#header-wrap {
  position: fixed;
  height: $layoutHeader;
  top: 0;
  right: 0;
  left: $navMenu;
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
  @include webkit(transition, all 0.3s ease 0s);
  line-height: $layoutHeader;
}
.header-icon {
  padding: 0 32px;
  .svg-icon {
    margin-bottom: -14px;
    font-size: 25px;
    cursor: pointer;
  }
  .quit {
    color: #344a5f;
    margin-bottom: -6px;
  }
  .menu {
    color: #3d5266;
  }
}
.user-info {
  height: 100%;
  padding: 0 32px;
  border-right: 1px solid #ededed;
  + .header-icon {
    padding: 0 28px;
  }
  img {
    display: inline-block;
    margin-right: 18px;
    margin-bottom: -11px;
    border-radius: 50px;
  }
}
.open {
  #header-wrap {
    left: $navMenu;
  }
}
.close {
  #header-wrap {
    left: $navMenuMin;
  }
}
</style>
