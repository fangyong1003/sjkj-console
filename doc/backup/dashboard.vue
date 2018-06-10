<template>
  <div>
    <el-row :gutter="gutter">
      <el-col :span="16">
        <div style="height: 100%; border: 1px solid #e6e6e6; overflow: hidden;">
          <div class="dashboard-stats">
            <div class="dashboard-stats-item" style="background-color: #578ebe;">
              <div class="stat-icon">
                <i class="fa fa-clock-o"></i>
              </div>
              <h2 class="m-top-none">{{getSysDashboardTodoCount}}<span>个</span></h2>
              <h5>待办未处理</h5>
            </div>
          </div>
          <div class="dashboard-stats">
            <div class="dashboard-stats-item" style="background-color: #e35b5a;">
              <h2 class="m-top-none">{{getSysDashboardWarningCount}}<span>条</span></h2>
              <h5>预警信息未读</h5>
              <div class="stat-icon">
                <i class="fa fa-bell"></i>
              </div>
            </div>
          </div>
          <div class="dashboard-stats">
            <div class="dashboard-stats-item" style="background-color: #44b6ae;">
              <h2 class="m-top-none">{{getSysDashboardEmailUnReadCount}}<span>封</span></h2>
              <h5>邮件未读</h5>
              <div class="stat-icon">
                <i class="fa fa-envelope-o"></i>
              </div>
            </div>
          </div>
          <div class="dashboard-stats">
            <div class="dashboard-stats-item" style="background-color: #8775a7; margin-right: 0px;">
              <h2 class="m-top-none">{{getSysDashboardUnSignCount}}</h2>
              <h5>对公待签收任务</h5>
              <div class="stat-icon">
                <i class="fa fa-gavel"></i>
              </div>
            </div>
          </div>
          <div class="dashboard-stats">
            <div class="dashboard-stats-item" style="background-color: #4f5c65; margin-bottom: 0px;">
              <h2 class="m-top-none">{{getSysDashboardTodayOrderCount}}<span>件</span></h2>
              <h5>今日订单数</h5>
              <div class="stat-icon">
                <i class="fa fa-shopping-cart"></i>
              </div>
            </div>
          </div>
          <div class="dashboard-stats">
            <div class="dashboard-stats-item" style="background-color: #14aae4; margin-bottom: 0px;">
              <h2 class="m-top-none">{{getSysDashboardYesterdayOrderCount}}<span>件</span></h2>
              <h5>昨日订单数</h5>
              <div class="stat-icon">
                <i class="fa fa-file-text-o"></i>
              </div>
            </div>
          </div>
          <div class="dashboard-stats">
            <div class="dashboard-stats-item" style="background-color: #949FB1; margin-bottom: 0px;">
              <h2 class="m-top-none">{{getSysDashboardRefuseOrderCount}}<span>件</span></h2>
              <h5>回退订单数</h5>
              <div class="stat-icon">
                <i class="fa fa-coffee"></i>
              </div>
            </div>
          </div>
          <div class="dashboard-stats">
            <div class="dashboard-stats-item" style="background-color: #f29503; margin-right: 0px; margin-bottom: 0px;">
              <h2 class="m-top-none">{{getSysDashboardYesterdayTradeCount}}<span>元</span></h2>
              <h5>昨日成交金额</h5>
              <div class="stat-icon">
                <i class="fa fa-rmb" style="padding-left: 10px;"></i>
              </div>
            </div>
          </div>
        </div>

      </el-col>
      <el-col :span="8" style="height:222px">
        <!--<chart/>-->
      </el-col>
    </el-row>

    <el-row :gutter="gutter" style="margin-top:10px;">
      <el-col :span="16" style="height:222px;">
        <!--<chart2/>-->
      </el-col>
      <el-col :span="8" style="height:222px;">
        <!--<chart3/>-->
      </el-col>
    </el-row>

    <el-row :gutter="gutter" style="margin-top:10px;">
      <el-col :span="8">
        <div class="panel panel-default">
          <div class="panel-heading"><i class="fa fa-rss fa-lg" style="padding-right: 5px;"></i>通知公告</div>
          <div class="panel-body">
            <ul>
              <li v-for="item in noticeList">
                <a :href="item.href" target="_blank">{{item.title}}</a><span class="time">{{item.createDate}}</span>
              </li>
            </ul>
          </div>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="panel panel-default">
          <div class="panel-heading"><i class="fa fa-send fa-lg" style="padding-right: 5px;"></i>企业文化</div>
          <div class="panel-body">
            <ul>
              <li v-for="item in kbList">
                <a :href="item.href" target="_blank">{{item.title}}</a><span class="time">{{item.createDate}}</span>
              </li>
            </ul>
          </div>
        </div>
      </el-col>

      <el-col :span="8">
        <div class="panel panel-default">
          <div class="panel-heading"><i class="fa fa-thumbs-o-up fa-lg" style="padding-right: 5px;"></i>最新签约</div>
          <div class="panel-body">
            <ul>
              <li v-for="item in newSignList">
                <a :href="item.href" target="_blank">{{item.title}}</a><span class="time">{{item.createDate}}</span>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/babel">
  import { mapGetters } from 'vuex'

  import moduleStore from './bll/dashboardStore'
  import store from '../../store'
  (!store.state.sysDashboard) && store.registerModule('sysDashboard', moduleStore)

  //import chart from './chart.vue';
  //import chart2 from './chart2.vue';
  //import chart3 from './chart3.vue';

  export default{
    data() {
      return {
        gutter: 5
      }
    },
    computed: {
      ...mapGetters([
        'getSysDashboardTodoCount', 'getSysDashboardWarningCount', 'getSysDashboardEmailUnReadCount',
        'getSysDashboardUnSignCount', 'getSysDashboardTodayOrderCount', 'getSysDashboardYesterdayOrderCount',
        'getSysDashboardRefuseOrderCount', 'getSysDashboardYesterdayTradeCount'
      ]),
      noticeList() {
        return this.$store.state.sysDashboard.noticeList;
      },
      kbList() {
        return this.$store.state.sysDashboard.kbList;
      },
      newSignList() {
        return this.$store.state.sysDashboard.newSignList;
      }
    },
    mounted() {
      this.initPage();
    },
    //components: {chart, chart2, chart3},
    methods: {
      initPage() {

      },
      _initChart() {

      }
    }

  }
</script>

<style lang="scss" scoped>
  .dashboard-stats {
    float: left;
    width: 25%;
  }

  .dashboard-stats-item {
    position: relative;
    overflow: hidden;
    color: #fff;
    cursor: pointer;
    height: 105px;
    margin-right: 10px;
    margin-bottom: 10px;
    padding-left: 15px;
    padding-top: 20px;
  }

  .dashboard-stats-item .m-top-none {
    margin-top: 5px;
  }

  .dashboard-stats-item h2 {
    font-size: 28px;
    font-family: inherit;
    line-height: 1.1;
    font-weight: 500;
    padding-left: 70px;
  }

  .dashboard-stats-item h2 span {
    font-size: 12px;
    padding-left: 5px;
  }

  .dashboard-stats-item h5 {
    font-size: 12px;
    font-family: inherit;
    margin-top: 1px;
    line-height: 1.1;
    padding-left: 70px;
  }

  .dashboard-stats-item .stat-icon {
    position: absolute;
    top: 18px;
    font-size: 50px;
    opacity: .3;
  }

  .dashboard-stats i.fa.stats-icon {
    width: 50px;
    padding: 20px;
    font-size: 50px;
    text-align: center;
    color: #fff;
    height: 50px;
    border-radius: 10px;
  }

  .panel-default {
    border: none;
    border-radius: 0px;
    margin-bottom: 0px;
    box-shadow: none;
    -webkit-box-shadow: none;
    background-color: white;
    font-size: 12px;
    color: #000000;
    min-height: 300px;
  }

  .panel-default > .panel-heading {
    color: #777;
    background-color: #fff;
    border-color: #e6e6e6;
    padding: 10px 10px;
  }

  .panel-default > .panel-body {
    padding: 10px;
    padding-bottom: 0px;
  }

  .panel-default > .panel-body ul {
    overflow: hidden;
    padding: 0;
    margin: 0px;
    margin-top: -5px;
  }

  .panel-default > .panel-body ul li {
    line-height: 27px;
    list-style-type: none;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .panel-default > .panel-body ul li .time {
    color: #a1a1a1;
    float: right;
    padding-right: 5px;
  }
</style>
