<template>hello</template>

<script>
  import { defineComponent, reactive, toRefs } from "vue";

  export default defineComponent({
    name: "Index",
    setup() {
      const state = reactive({});

      return {
        ...toRefs(state),
      };
    },
  });
</script>
