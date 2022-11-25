import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
export default defineConfig({
  // 配置别名
  resolve: {
    alias: [
      {
        find: "@", //指向的是src目录
        replacement: resolve(__dirname, "src"),
      },
    ],
  },
  build: {
    chunkSizeWarningLimit: 10240,
    target: ["edge90", "chrome90", "firefox90", "safari15"],
  },
  plugins: [vue()],
  // 自动打开浏览器
  server: {
    open: true,
  },
  base: "/manage",
});
