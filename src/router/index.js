import { createRouter, createWebHashHistory } from "vue-router";

import store from "@/store";
import lowcold from "@/config/lowcold.js";
import { getRouter } from "@/axios/api.js";

const staticRoute = [
  {
    name: "Login",
    path: "/login",
    meta: {
      auth: false,
      menu: false,
      layout: false,
    },
    component: () => import("@/views/login/index.vue"),
  },
  // 404错误页面的路由文件
  {
    path: "/404",
    name: "NotFound",
    meta: {
      auth: false,
      menu: false,
      layout: false,
    },
    component: () => import("@/views/error/404.vue"),
  },
];

export let asyncRoutes = [
  {
    id: 1,
    pid: 0,
    title: "图表",
    name: "Home",
    path: "Home",
    component: "Layout",
    icon: "bar-chart",
    button: [],
    meta: {
      menu: true,
      layout: true,
      auth: true,
    },
    children: [
      {
        id: 2,
        pid: 1,
        title: "echarts",
        name: "HomeEcharts",
        path: "/",
        component: "/views/echarts/index.vue",
        icon: "bar-chart",
        button: [],
        meta: {
          menu: true,
          layout: true,
          auth: true,
        },
      },
    ],
  },
  {
    id: 3,
    pid: 0,
    title: "图标",
    name: "Icon",
    path: "Icon",
    component: "Layout",
    icon: "fonticons",
    button: [],
    meta: {
      menu: true,
      layout: true,
      auth: true,
    },
    children: [
      {
        id: 4,
        pid: 3,
        title: "icon图标库",
        name: "IconIndex",
        path: "/icon",
        component: "/views/icon/index.vue",
        icon: "fonticons",
        button: [],
        meta: {
          menu: true,
          layout: true,
          auth: true,
        },
      },
    ],
  },
  {
    id: 5,
    pid: 0,
    title: "ELP",
    name: "ELP",
    path: "ELP",
    component: "Layout",
    icon: "etsy",
    button: [],
    meta: {
      menu: true,
      layout: true,
      auth: true,
    },
    children: [
      {
        id: 6,
        pid: 5,
        title: "Form表单",
        name: "ELPForm",
        path: "/form",
        component: "/views/elp/form.vue",
        icon: "wpforms",
        button: [],
        meta: {
          menu: true,
          layout: true,
          auth: true,
        },
      },
      {
        id: 7,
        pid: 5,
        title: "Table表格",
        name: "ELPTable",
        path: "/table",
        component: "/views/elp/table.vue",
        icon: "table",
        button: [],
        meta: {
          menu: true,
          layout: true,
          auth: true,
        },
      },
      {
        id: 8,
        pid: 5,
        title: "Tabs标签",
        name: "ELPTabs",
        path: "/tabs",
        component: "/views/elp/tabs.vue",
        icon: "window-restore",
        button: [],
        meta: {
          menu: true,
          layout: true,
          auth: true,
        },
      },
    ],
  },
];

// 获取本地页面列表
const modules = import.meta.glob("@/views/**/*.vue");

const layoutRoute = (data) => {
  return data.map((map) => {
    if (map.children == undefined) {
      return map;
    } else {
      layoutRoute(map.children);
    }
  });
};

// 修改路由的导入
const restRouter = (routes) => {
  if (routes) {
    // 循环输出传入的路由
    return routes.map((route) => {
      // 判断component是否为真
      if (route.component) {
        if (route.children) {
          const layout = layoutRoute(route.children)[0];
          route.path = layout.path;
          route.component = "";
        }
        // 完整路由文件所在路径
        const component = `/src${route.component}`;
        // 判断返回的路由文件是否存在
        if (modules[component]) {
          // 修改component
          route.component = modules[component];
        }
      }
      // 判断是否有下级路由
      if (route.children && route.children.length)
        route.children = restRouter(route.children);
      if (route.children && route.children.length === 0) delete route.children;
      return route;
    });
  }
};

if (lowcold.auth == "admin") {
  // 判断是否登录
  if (store.state.login) {
    // 获取后端路由
    const res = await getRouter();
    // 判断状态是否正常
    if (res.code == 200) {
      asyncRoutes = res.data;
      // 序列化路由(import指向本地页面)
    }
  }
}

asyncRoutes = restRouter(asyncRoutes);

// 异步菜单循环并添加
asyncRoutes.forEach((menu) => {
  // 判断菜单是否显示
  if (menu.meta.menu) {
    staticRoute.push(menu);
  }
});

// console.log(staticRoute);

//可以在这里输入更多的配置
const router = createRouter({
  // 内部提供了history模式的实现，为了简单起见，我们这里使用hash模式
  history: createWebHashHistory(),
  routes: staticRoute,
});

router.beforeEach((to) => {
  // 判断路由是否需要登录
  if (to.meta.auth) {
    // 判断用户没有登录
    if (store.state.login != 1) {
      // 跳转到登录页
      router.replace("/login");
    }
  }
});

export default router;
