<template>
  <div class="lowcold-header">
    <div class="logo">
      <img src="@/assets/img/logo.png" />
    </div>
    <div class="head">
      <div class="hello">{{ hello }}，尊敬的 {{ $store.state.username }}</div>
      <div class="outLogin" @click="outLogin">
        <lowcold-icon name="sign-out" />
        退出登录
      </div>
    </div>
  </div>
</template>

<script>
  import { getCurrentInstance, defineComponent, reactive, toRefs } from "vue";
  import lowcoldIcon from "@/layout/lowcoldIcon.vue";
  export default defineComponent({
    name: "LayoutHeader",
    components: { lowcoldIcon },
    setup() {
      let getTimeState = () => {
        // 获取当前时间
        let timeNow = new Date();
        // 获取当前小时
        let hours = timeNow.getHours();
        // 设置默认文字
        let text = ``;
        // 判断当前时间段
        if (hours >= 0 && hours <= 10) {
          text = `早上好`;
        } else if (hours > 10 && hours <= 14) {
          text = `中午好`;
        } else if (hours > 14 && hours <= 18) {
          text = `下午好`;
        } else if (hours > 18 && hours <= 24) {
          text = `晚上好`;
        }
        // 返回当前时间段对应的状态
        return text;
      };

      const { proxy } = getCurrentInstance();

      const state = reactive({
        hello: getTimeState(),
      });

      const outLogin = () => {
        proxy.$store.commit("del", "token");
        proxy.$store.commit("del", "login");
        proxy.$store.commit("del", "loginState");
        proxy.$store.commit("del", "nav_active");
        proxy.$store.commit("del", "menu_active");
        proxy.$router.replace("/login");
      };

      return {
        ...toRefs(state),
        outLogin,
      };
    },
  });
</script>
