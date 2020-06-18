<template>
  <section id="layout" :class="[menuCollapseState?'close':'open']">
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </section>
</template>

<script>
import LayoutHeader from "./components/header.vue";
import LayoutMain from "./components/main.vue";
import LayoutNav from "./components/nav.vue";
import { computed } from "@vue/composition-api";
export default {
  name: "layout",
  components: { LayoutHeader, LayoutMain, LayoutNav },
  setup(props, { root }) {
    const menuCollapseState = computed(() => root.$store.state.app.isCollapse);
    
    return { menuCollapseState };
  }
};
</script>

<style scoped lang="scss">
#layout {
  background-color: #f7f7f7;
}

</style>
