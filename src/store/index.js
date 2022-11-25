import { createStore } from "vuex";
import { local } from "./local";

// 创建一个新的 store 实例
const store = createStore({
  state() {
    return {
      login: local.get("login") || null,
      token: local.get("token") || null,
      username: local.get("username") || "admin",
      loginState: local.get("loginState") || null,
      nav_active: local.get("nav_active") || null,
      menu_active: local.get("menu_active") || null,
    };
  },
  mutations: {
    set(state, data) {
      state[data[0]] = data[1];
      local.set(data[0], data[1]);
    },
    del(state, name) {
      if (state[name]) {
        local.remove(name);
      }
    },
  },
});

export default store;
