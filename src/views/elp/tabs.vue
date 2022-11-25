<template>
  <h2 style="margin-bottom: 40px">Element-plus Tabs标签示例</h2>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="User" name="first">User</el-tab-pane>
    <el-tab-pane label="Config" name="second">Config</el-tab-pane>
    <el-tab-pane label="Role" name="third">Role</el-tab-pane>
    <el-tab-pane label="Task" name="fourth">Task</el-tab-pane>
  </el-tabs>
  <div class="cold-tips">
    详情请查看element-Tabs标签
    <a
      href="https://element-plus.gitee.io/zh-CN/component/tabs.html"
      target="_blank"
    >
      Tabs
    </a>
  </div>
</template>

<script>
  import { defineComponent, reactive, toRefs } from "vue";

  export default defineComponent({
    name: "ELPTabs",
    setup() {
      const state = reactive({
        activeName: "first",
      });

      const handleClick = (tab, event) => {
        console.log(tab, event);
      };

      return {
        ...toRefs(state),
        handleClick,
      };
    },
  });
</script>
