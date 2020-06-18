<template>
  <section id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view />
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name:"layoutmain",
  setup() {

    return {
      
    }
  }
};
</script>

<style scoped lang="scss">
@import "../../../styles/config.scss";
#main-wrap {
  height: 100vh;
  // position: fixed;
  // left: $navMenu;
  // top: 75px;
  // right: 0;
  // bottom: 0;
  // border-bottom: none;
  // box-sizing: border-box;
  // background-color: #fff;
}
.main-content {
  height: 100%;
  padding: $layoutHeader + 30px 30px 0 $navMenu + 30px;
  // padding-top: $layoutHeader + 30px;
  // padding-left: $navMenu + 30px;
  @include webkit(box-sizing ,border-box);
  @include webkit(transition,all 0.3s ease 0s);
}
.content {
  height: 100%;
  padding: 30px 30px 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  background-color: #fff;
}
.open {
  .main-content {
    padding-left: $navMenu + 30px;
  }
}
.close {
  .main-content {
    padding-left: $navMenuMin + 30px;
  }
}
</style>