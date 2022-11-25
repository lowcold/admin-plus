import axios from "axios";
import cold from "@/config/cold.js";
import { ElMessage } from "element-plus";
import store from "@/store";

//创建axios的一个实例
var instance = axios.create({
  baseURL: cold.api, //接口统一域名
  timeout: 6000, //设置超时
  headers: {
    "Content-Type": "application/json;charset=UTF-8;",
  },
});

//请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    const token = store.state.token;
    token && (config.headers.Authorization = token);
    //若请求方式为post，则将data参数转为JSON字符串
    if (config.method === "POST") {
      config.data = JSON.stringify(config.data);
    }
    return config;
  },
  (error) =>
    // 对请求错误做些什么
    Promise.reject(error)
);

const login = window.location.origin + "/#" + "/login";

//响应拦截器
instance.interceptors.response.use((response) => {
  // 判断是否为错误
  if (response.data.code == 0) {
    ElMessage({
      showClose: true,
      message: response.data.msg,
      type: "warning",
    });
  }
  // 判断是否为登录失效
  if (response.data.code == 401) {
    if (store.state.login) {
      store.commit("del", "token");
      store.commit("del", "login");
      store.commit("del", "loginState");
      store.commit("del", "nav_active");
      store.commit("del", "menu_active");
      ElMessage({
        showClose: true,
        message: "token失效，请重新登录",
        type: "error",
      });
      window.location.replace(login);
      setTimeout(function () {
        console.log("token失效，请重新登录");
      }, 1000);
    } else {
      store.commit("del", "token");
      store.commit("del", "login");
      store.commit("del", "loginState");
      store.commit("del", "nav_active");
      store.commit("del", "menu_active");
      ElMessage({
        showClose: true,
        message: "请先新登录",
        type: "error",
      });
      window.location.replace(login);
      setTimeout(function () {
        console.log("请先新登录");
      }, 1000);
    }
  }
  return response.data;
});

export default instance;
