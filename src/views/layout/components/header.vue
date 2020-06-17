<template>
  <section id="header-wrap">头部</section>
</template>

<script>
export default {
  setup() {}
};
</script>

<style scoped lang="scss">
@import "../../../styles/config.scss";
#header-wrap {
  position: fixed;
  height: 75px;
  top: 0;
  right: 0;
  left: $navMenu;
  box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
}
</style>
