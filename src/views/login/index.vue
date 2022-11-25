<template>
  <div class="login" v-loading="loading">
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item prop="username">
        <el-input
          placeholder="请输入用户名"
          prefix-icon="User"
          v-model="form.username"
        />
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          placeholder="请输入登录密码"
          prefix-icon="Lock"
          v-model="form.password"
        />
      </el-form-item>
      <el-button type="info" @click="doLogin">立即登录</el-button>
    </el-form>
    <div class="by">Copyright © {{ year }} 蚂蚁雄兵 版权所有</div>
  </div>
</template>

<script>
  import { defineComponent, getCurrentInstance, reactive, toRefs } from "vue";
  import { login, getRouter } from "@/axios/api.js";
  import store from "@/store";
  export default defineComponent({
    name: "Login",
    setup() {
      const { proxy } = getCurrentInstance();

      const state = reactive({
        form: {},
        formRef: null,
        loading: false,
        rules: {
          username: [
            {
              required: true,
              trigger: ["change", "blur"],
              message: "请输入用户名称",
            },
          ],
          password: [
            {
              required: true,
              trigger: ["change", "blur"],
              message: "请输入登录密码",
            },
          ],
        },
        year: new Date().getFullYear(),
      });

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
                route.component = layout.component;
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
            if (route.children && route.children.length === 0)
              delete route.children;
            return route;
          });
        }
      };

      const getRouters = async () => {
        // 获取后端路由
        const res = await getRouter();
        if (res.code == 200) {
          // 序列化路由(import指向本地页面)
          const adminRoute = restRouter(res.data);
          // 返回第一个路由
          return adminRoute[0].path;
        }
      };

      const doLogin = async () => {
        state.loading = true;
        state["formRef"].validate(async (valid) => {
          if (valid) {
            const res = await login(state.form);
            if (res.code == 200) {
              // 设置用户登录状态为1
              store.commit("set", ["login", 1]);
              // 设置token
              store.commit("set", ["token", "Bearer " + res.data.token]);
              // 获取后端第一个路由的路径并
              const path = await getRouters();
              if (path) {
                // 设置选中菜单的路由
                store.commit("set", ["menu_active", path]);
                // 跳转到第一个路由
                proxy.$router.replace(path);
                setTimeout(function () {
                  window.location.reload();
                }, 100);
              }
            }
          }
          state.loading = false;
        });
      };

      return {
        ...toRefs(state),
        doLogin,
      };
    },
  });
</script>

<style lang="scss" scoped>
  .login {
    top: 50%;
    left: 50%;
    width: 300px;
    position: absolute;
    border-radius: 10px;
    margin-top: -111px;
    margin-left: -150px;
    background: #fff;
    box-shadow: 0 0 20px 10px rgba(0, 0, 0, 0.08);
    .el-form {
      padding: 20px;
      .el-button {
        width: 100%;
      }
    }
    .by {
      font-size: 12px;
      padding: 0 10px;
      text-align: center;
      margin-bottom: 20px;
    }
  }
</style>
