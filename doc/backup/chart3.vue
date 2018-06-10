<!-- Created by shi.pengyan on 2017-01-10. -->
<template>
  <div id="dashboard-chart3" style="height:100%"></div>
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

        const option = {
          title: {
            text: '站点用户访问来源',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
              ],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };


        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(document.getElementById('dashboard-chart3'));
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
