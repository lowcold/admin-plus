<template>
  <h2 style="margin-bottom: 40px">Element-plus Table表单示例</h2>
  <div class="cold-tips">
    详情请查看element-Table的表单
    <a
      href="https://element-plus.gitee.io/zh-CN/component/table.html"
      target="_blank"
    >
      Table
    </a>
  </div>
</template>

<script>
  import { defineComponent, reactive, toRefs } from "vue";

  export default defineComponent({
    name: "Table",
    setup() {
      const state = reactive({});

      return {
        ...toRefs(state),
      };
    },
  });
</script>
