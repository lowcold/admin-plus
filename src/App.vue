<template>
  <div class="cold" v-if="$route.meta.layout">
    <layout-header />
    <div class="cold-bottom">
      <layout-menu />
      <div class="cold-content">
        <div class="cold-cont">
          <div class="cold-scroll">
            <router-view />
          </div>
        </div>
        <div class="cold-by">Copyright © {{ year }} 蚂蚁雄兵</div>
      </div>
    </div>
  </div>
  <div v-else>
    <router-view />
  </div>
</template>

<script>
  import { defineComponent, onMounted, reactive, toRefs } from "vue";
  import layoutMenu from "@/layout/menu.vue";
  import layoutHeader from "@/layout/header.vue";
  export default defineComponent({
    name: "App",
    components: {
      layoutMenu,
      layoutHeader,
    },
    setup() {
      const state = reactive({
        year: new Date().getFullYear(),
      });

      onMounted(() => {});

      return {
        ...toRefs(state),
      };
    },
  });
</script>
