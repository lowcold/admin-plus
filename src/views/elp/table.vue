<template>
  <h2 style="margin-bottom: 40px">Element-plus Table表单示例</h2>
  <el-table :data="tableData" :border="true">
    <el-table-column fixed prop="id" label="ID" width="50" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="state" label="State" width="120" />
    <el-table-column prop="city" label="City" width="120" />
    <el-table-column prop="address" label="Address" />
    <el-table-column prop="zip" label="Zip" width="120" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default>
        <el-button link type="primary" size="small" @click="handleClick">
          Detail
        </el-button>
        <el-button link type="primary" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    v-model:current-page="queryForm.page"
    v-model:page-size="queryForm.limit"
    :page-sizes="size"
    :background="flase"
    :layout="layout"
    :total="total"
    @size-change="sizeChange"
    @current-change="currentChange"
  />
  <div class="lowcold-tips">
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
    name: "ELPTable",
    setup() {
      const state = reactive({
        total: 400,
        limit: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        layout: "total, sizes, prev, pager, next, jumper",
        queryForm: {
          page: 1,
          limit: 10,
        },
        tableData: [
          {
            id: "1",
            name: "Tom",
            state: "California",
            city: "Los Angeles",
            address: "No. 189, Grove St, Los Angeles",
            zip: "CA 90036",
            tag: "Home",
          },
          {
            id: "2",
            name: "Tom",
            state: "California",
            city: "Los Angeles",
            address: "No. 189, Grove St, Los Angeles",
            zip: "CA 90036",
            tag: "Office",
          },
          {
            id: "3",
            name: "Tom",
            state: "California",
            city: "Los Angeles",
            address: "No. 189, Grove St, Los Angeles",
            zip: "CA 90036",
            tag: "Home",
          },
          {
            id: "4",
            name: "Tom",
            state: "California",
            city: "Los Angeles",
            address: "No. 189, Grove St, Los Angeles",
            zip: "CA 90036",
            tag: "Office",
          },
        ],
      });

      const sizeChange = (val) => {
        console.log(`每页数据：${val}条`);
      };
      const currentChange = (val) => {
        console.log(`当前分页：${val}`);
      };

      return {
        ...toRefs(state),
        sizeChange,
        currentChange,
      };
    },
  });
</script>
