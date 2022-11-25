<template>
  <div class="lowcold-menu" @mouseleave="getData">
    <div class="lowcold-menu-nav">
      <div
        :class="item.class"
        v-for="item in menu"
        @mousemove="menuMouseMove(item)"
        :key="item"
      >
        <lowcold-icon :name="item.icon" color="#ff000" />
        {{ item.title }}
      </div>
    </div>
    <div class="lowcold-menu-ul">
      <el-tree
        ref="tree"
        :data="nav"
        node-key="id"
        highlight-current
        default-expand-all
        icon="ArrowRightBold"
        :props="props"
        @node-click="nodeClick"
      >
        <template #default="{ node, data }">
          <lowcold-icon :name="data.icon" size="14" />
          <span>{{ node.label }}</span>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<script>
  import {
    getCurrentInstance,
    defineComponent,
    onMounted,
    reactive,
    toRefs,
    watch,
  } from "vue";
  import lowcoldIcon from "./lowcoldIcon.vue";
  export default defineComponent({
    components: { lowcoldIcon },
    name: "Layout",
    setup() {
      const { proxy } = getCurrentInstance();

      const store = proxy.$store;

      const router = proxy.$router;

      const state = reactive({
        nav: [],
        menu: [],
        route: router,
        props: { children: "children", label: "title" },
      });

      const nodeClick = (item) => {
        // // 判断点击的菜单没有下级
        if (item.children == undefined) {
          // 获取最顶级的菜单
          const parent = state.menu[item.pIdx];
          // 设置当前选中的nav
          store.commit("set", ["nav_active", item.path]);
          // 设置当前选中的菜单
          store.commit("set", ["menu_active", parent.path]);
          // 重新获取数据
          getData();
          router.replace(item.path);
        }
      };

      const set_ppid = (item, ppid) => {
        if (item.children) {
          item.children.map((val) => {
            val.pIdx = ppid;
            if (val.children) {
              set_ppid(val, ppid);
            }
          });
        }
      };

      // 菜单树设置高亮
      const navs = (data, path) => {
        if (data) {
          // 循环所有菜单
          data.map((res) => {
            // 判断菜单是否等于选中的菜单
            if (res.path == path) {
              // 设置高亮
              proxy.$nextTick(() => {
                proxy.$refs.tree.setCurrentKey(res.id);
              });
            } else {
              // 如果有子级，继续循环
              if (res.children) {
                navs(res.children, path);
              }
            }
          });
        }
      };

      const getData = async () => {
        let i = 0;
        let menus = [];
        // 循环所有的路由
        router.options.routes.map((menu) => {
          // 判断菜单是否显示
          if (menu.meta.menu) {
            // 判断是有是一级菜单路径
            if (store.state.menu_active == menu.path) {
              // 设置菜单的高亮
              navs(menu.children, store.state.nav_active);
              // 设置菜单
              state.nav = menu.children;
              // 设置菜单为选中
              menu.class = "item active";
            } else {
              menu.class = "item";
            }
            set_ppid(menu, i);
            menus.push(menu);
            i++;
          }
        });
        state.menu = menus;
      };

      const menuMouseMove = (item) => {
        getData();
        state.nav = item.children;
        if (item.class != "item active") {
          item.class = "item active";
        }
      };

      watch(() => {
        if (store.state.loginState != 1) {
          store.commit("set", ["loginState", 1]);
          self.location.reload();
        }
      });

      onMounted(() => {
        getData();
      });

      return {
        ...toRefs(state),
        getData,
        nodeClick,
        menuMouseMove,
      };
    },
  });
</script>
