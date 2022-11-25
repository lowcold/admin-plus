<template>
  <i :class="'fa fa-' + name"></i>
</template>

<script>
  // 引入图标库css
  import "font-awesome/css/font-awesome.min.css";
  import { defineComponent, onMounted, reactive, toRefs } from "vue";
  export default defineComponent({
    name: "ColdIcon",
    props: {
      name: {
        type: String,
        default() {
          return "";
        },
      },
    },
    setup() {
      const state = reactive({});

      onMounted(() => {});

      return {
        ...toRefs(state),
      };
    },
  });
</script>

<style scoped></style>
