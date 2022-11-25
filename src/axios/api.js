import axios from "@/axios/index";
// 获取路由接口
export const getRouter = (data) => {
  return axios({
    url: "router",
    method: "get",
    data,
  });
};
// 用户登录接口
export const login = (data) => {
  return axios({
    url: "login",
    method: "post",
    data,
  });
};
