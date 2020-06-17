<template>
  <section id="layout">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </section>
</template>

<script>
import LayoutHeader from "./components/header.vue";
import LayoutMain from "./components/main.vue";
import LayoutNav from "./components/nav.vue";
export default {
  name: "layout",
  components: { LayoutHeader, LayoutMain, LayoutNav },
  setup() {}
};
</script>

<style scoped lang="scss">
#layout{
  background-color: #f7f7f7;
}
</style>
