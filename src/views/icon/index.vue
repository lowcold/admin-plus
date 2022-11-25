<template>
  <div class="lowcold-search">
    <el-form :inline="true" :model="queryForm">
      <el-form-item label="关键词(英文)">
        <el-input v-model="queryForm.key" placeholder="Approved by" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">搜索</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="lowcold-icons">
    <el-row gutter="10">
      <el-col
        class="icon-item"
        :xs="12"
        :sm="8"
        :md="6"
        :lg="4"
        :xl="2"
        v-for="item in lowcoldIcons"
        :key="item"
        @click="copy(item)"
      >
        <div class="lowcold-icon">
          <lowcold-icon :name="item" size="22" />
        </div>
        <p>{{ item }}</p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { defineComponent, reactive, toRefs } from "vue";
  import { icons } from "@/config/lowcoldIcon.js";
  import lowcoldIcon from "@/layout/lowcoldIcon.vue";
  import { ElMessage } from "element-plus";
  export default defineComponent({
    name: "Icon",
    components: { lowcoldIcon },
    setup() {
      const state = reactive({
        queryForm: {
          page: 1,
          key: "",
          limit: 10,
        },
        lowcoldIcons: icons,
      });

      const copy = (text) => {
        const el = document.createElement("input");
        el.setAttribute("value", text);
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        ElMessage({
          showClose: true,
          message: text + "复制成功",
          type: "success",
        });
      };

      const query = () => {
        const key = state.queryForm.key;
        if (key) {
          let searchIcon = [];
          icons.map((map) => {
            if (map.search(key) != -1) {
              searchIcon.push(map);
            }
          });
          state.lowcoldIcons = searchIcon;
        } else {
          state.lowcoldIcons = icons;
        }
      };

      return {
        ...toRefs(state),
        copy,
        query,
      };
    },
  });
</script>
