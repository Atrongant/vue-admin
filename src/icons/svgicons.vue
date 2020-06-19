<template>
  <svg :class="svgclass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { ref, reactive, computed } from "@vue/composition-api";
export default {
  name: "svgicons",
  // 父组件传过来的值
  props: {
    className: {
      type: String
    },
    iconClass: {
      type: String
    }
  },
  setup(props) {
    const msg = ref("abcdefghijkl");
    // 计算属性值
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgclass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return "svg-icon";
      }
    });
    return {
      msg,
      iconName,
      svgclass
    };
  }
};
</script>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
