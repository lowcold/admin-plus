<template>
  <h1>404</h1>
</template>

<script>
  import { defineComponent, onMounted, reactive, toRefs } from "vue";
  import router from "@/router";
  export default defineComponent({
    name: "NotFound",
    setup() {
      const state = reactive({
        routers: router.options.routes,
      });

      onMounted(() => {
        // console.log(state.routers);
      });

      return {
        ...toRefs(state),
      };
    },
  });
</script>
