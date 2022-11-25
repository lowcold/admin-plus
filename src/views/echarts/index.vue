<template>
  <h2 style="margin-bottom: 40px">Echarts图表示例</h2>
  <cold-chart
    style="width: 100%"
    :init-options="initOptions"
    :option="option"
    theme="cold-echarts-theme"
  />
  <div class="cold-tips">
    更多图表示例请参考
    <a href="https://echarts.apache.org/examples/zh/index.html" target="_blank">
      ECharts
    </a>
    官方
  </div>
</template>

<script>
  import { defineComponent, reactive, toRefs } from "vue";
  import ColdChart from "@/extra/ColdChart/index.vue";

  export default defineComponent({
    name: "Echarts",
    components: {
      ColdChart,
    },
    setup() {
      const state = reactive({
        initOptions: {
          renderer: "svg",
        },
        option: {
          tooltip: {
            trigger: "axis",
            extraCssText: "z-index:1",
          },
          grid: {
            top: "4%",
            left: "2%",
            right: "2%",
            bottom: "0%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              data: [
                "1月",
                "2月",
                "3月",
                "4月",
                "5月",
                "6月",
                "7月",
                "8月",
                "9月",
                "10月",
                "11月",
                "12月",
              ],
              boundaryGap: false,
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "签单",
              type: "line",
              data: [
                1295, 3020, 1330, 512, 4463, 2214, 3330, 2412, 1205, 820, 3330,
                912,
              ],
              symbol: "circle",
              smooth: true,
              yAxisIndex: 0,
              showSymbol: false,
              lineStyle: {},
              areaStyle: {
                opacity: 0.8,
              },
            },
            {
              name: "回款",
              type: "line",
              data: [
                2905, 2020, 1730, 128, 963, 4614, 630, 1912, 1005, 1782, 1530,
                912,
              ],
              symbol: "circle",
              smooth: true,
              yAxisIndex: 0,
              showSymbol: false,
              lineStyle: {},
              areaStyle: {
                opacity: 0.8,
              },
            },
          ],
        },
      });

      return {
        ...toRefs(state),
      };
    },
  });
</script>
