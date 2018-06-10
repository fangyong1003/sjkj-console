<!-- Created by shi.pengyan on 2017-01-10. -->
<template>
  <div id="dashboard-chart2" style="height:100%"></div>
</template>

<script type="text/babel">
  import echarts from 'echarts';

  export default{
    data() {
      return {
        msg: 'hello vue'
      }
    },
    mounted() {
      this.initPage();
    },
    methods: {
      initPage() {
        this._initChart();
      },
      _initChart() {

        const option = {
          title: {
            text: '日访问量',
            x: 'left'
          },
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '直接访问',
              type: 'bar',
              barWidth: '60%',
              data: [10, 52, 200, 334, 390, 330, 220]
            }
          ]
        };


        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('dashboard-chart2'));
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

<style lang="scss">

</style>
