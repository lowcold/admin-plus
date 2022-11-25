// 判断路由是否为后端路由
if (auth == "admin") {
  // 判断是否登录
  if (store.state.login) {
    // 获取后端路由
    const res = await getRouter();
    // 判断是否正确获取路由
    if (res.code == 200) {
      const data = res.data;
      // 序列化路由(import指向本地页面)
      const adminRoute = restRouter(data);
      // 获取存储的路由
      const adminRouter = store.state.routes;
      // 判断存储的路由是否不等于0以及登录状态为真
      if (
        adminRouter != null &&
        adminRouter.length != 0 &&
        store.state.login == 1
      ) {
        // 设置webRoutes为空
        webRoutes = [];
        // 循环存储的后端路由
        adminRouter.map((route) => {
          // 追加后端路由
          webRoutes.push(route);
        });
      }
    }
  } else {
    // 组合完整的前端路由
    staticRoute.map((route) => {
      webRoutes.push(route);
    });

    //可以在这里输入更多的配置
    const router = createRouter({
      // 内部提供了history模式的实现，为了简单起见，我们这里使用hash模式
      history: createWebHashHistory(),
      routes: webRoutes,
    });
    router.replace("/login");
  }
}
