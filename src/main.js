import { createApp } from "vue";
import App from "@/App.vue";
import store from "@/store";
// 引入路由文件
import router from "@/router";
// 引入element-plus
import ElementPlus from "element-plus";
// 引入element中文语言包
import locale from "element-plus/lib/locale/lang/zh-cn";
// 引入element
import "element-plus/dist/index.css";
// 引入自己的css
import "@/assets/css/style.css";
const app = createApp(App);
app.use(ElementPlus, { locale });
app.use(store);
app.use(router);
app.use(ElementPlus);
app.mount("#app");
