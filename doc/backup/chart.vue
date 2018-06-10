<!-- Created by shi.pengyan on 2017-01-09. -->
<template>
  <div id="chart1" style="height:100%"></div>
</template>

<script type="text/babel">
  import echarts from 'echarts';

  export default{
    data() {
      return {}
    },
    mounted() {
      this.initPage();
    },
    methods: {
      initPage() {
        this._initChart();
      },
      _initChart() {

        // 绘制图表
        const option = {
          title: {
            text: '营销渠道'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['联盟广告', '视频广告', '直接访问', '搜索引擎']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '联盟广告',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310]
            },
            {
              name: '视频广告',
              type: 'line',
              stack: '总量',
              data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
              name: '直接访问',
              type: 'line',
              stack: '总量',
              data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
              name: '搜索引擎',
              type: 'line',
              stack: '总量',
              data: [820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        };
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('chart1'));
        myChart.setOption(option);

        let timer = null;
        window.addEventListener('resize', () => {
          if (timer) {
            clearTimeout(timer);
          }
          timer = setTimeout(() => {
            myChart.resize();
          }, 200);
        });

      }
    }
  }
</script>
