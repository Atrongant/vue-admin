<template>
  <section id="main-wrap">
    <router-view />
  </section>
</template>

<script>
export default {
  setup() {}
};
</script>

<style scoped lang="scss">
@import "../../../styles/config.scss";
#main-wrap {
  position: fixed;
  left: $navMenu;
  top: 75px;
  right: 0;
  bottom: 0;
  border: 30px solid #f7f7f7;
  border-bottom: none;
  box-sizing: border-box;
  background-color: #fff;
}
</style>

