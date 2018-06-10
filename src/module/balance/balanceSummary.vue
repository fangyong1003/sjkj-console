<template>
  <div>
    <div class="btn-group-wrapper">
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <el-row>
          <el-col :span="5">
            <el-form-item label="生效开始时间" prop="startEffDate">
              <el-date-picker type="date"
                              v-model="form.startEffDate" format="yyyy-MM-dd" style="width:100%"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="生效结束时间" prop="endEffDate">
              <el-date-picker type="date"
                              v-model="form.endEffDate" format="yyyy-MM-dd" style="width:100%"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="orderSearch" style="margin-left: 10px">查询</el-button>
            <el-button type="success" @click="exportBalanceSummary">导出Excel</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-table :data="balanceList" height="470" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler"
              style="width: 100%">
      <el-table-column prop="effectiveDate" label="生效日期" width="150"/>
      <el-table-column prop="dailyTotalOpenProperty" label="期初总点石金红包" width="150"/>
      <el-table-column prop="dailyTotalOpenCredit" label="期初总点石金" width="150"/>
      <el-table-column prop="dailyTotalOpenBalance" label="期初总余额" width="150"/>
      <el-table-column prop="dailyTotalCloseProperty" label="期末总点石金红包" width="150"/>
      <el-table-column prop="dailyTotalCloseCredit" label="期末总点石金" width="150"/>
      <el-table-column prop="dailyTotalCloseBalance" label="期末总余额" width="150"/>
      <!--<el-table-column prop="closeProperty" label="期末点石金红包" width="150">-->
      <!--<template scope="scope">-->
      <!--{{scope.row.closeProperty/100}}-->
      <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<style lang="scss">
  .btn-group-wrapper {
    padding-bottom: 4px;
  }
</style>

<script type="text/babel">
  import { mapActions } from 'vuex'

  import moduleStore from './bll/balanceStore'
  import store from '../../store'
  //  import Vue from 'vue'
  (!store.state.sysBalance) && store.registerModule('sysBalance', moduleStore)


  export default{
    data() {
      return {
        form: {
          startEffDate: '',
          endEffDate: ''
        },
        currentPage: 1,
        pageSize: 10,
        currentSelectedRecord: null
      }
    },
    computed: {
      balanceList() {
        return this.$store.state.sysBalance.balanceSummarys;
      },
      totalCount() {
        return this.$store.state.sysBalance.totalCount;
      }
    },
    mounted() {
      console.log('[ProductType Page] mounted');
      this.initPage();
    },

    methods: {
      ...mapActions(['queryBalanceSummarys', 'exportBalanceSummaryExcel']),

      initPage() {
        let self = this;
        let conditions = self.form;
        this.queryBalanceSummarys({conditions});
      },

      tableRowChangeClickHandler (row, event, column) {
        console.log(row);
        this.currentSelectedRecord = row;
      },

      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val;
        let self = this;
        let conditions = self.form;
        if (conditions.startEffDate !== '' && conditions.startEffDate !== undefined) {
          if (conditions.startEffDate.toString().indexOf('-') < 0) {
            conditions.startEffDate = this.formatDate(conditions.startEffDate);
          }
        } else {
          conditions.startEffDate = '';
        }
        if (conditions.endEffDate !== '' && conditions.endEffDate !== undefined) {
          if (conditions.endEffDate.toString().indexOf('-') < 0) {
            conditions.endEffDate = this.formatDate(conditions.endEffDate);
          }
        } else {
          conditions.endEffDate = '';
        }
        this.queryBalanceSummarys({pageIndex: this.currentPage, pageSize: val, conditions: conditions});
      },

      handleCurrentChange (val) {
        console.log(arguments);
        console.log(`current${val}`);
        this.currentPage = val;
        let self = this;
        let conditions = self.form;
        if (conditions.startEffDate !== '' && conditions.startEffDate !== undefined) {
          if (conditions.startEffDate.toString().indexOf('-') < 0) {
            conditions.startEffDate = this.formatDate(conditions.startEffDate);
          }
        } else {
          conditions.startEffDate = '';
        }
        if (conditions.endEffDate !== '' && conditions.endEffDate !== undefined) {
          if (conditions.endEffDate.toString().indexOf('-') < 0) {
            conditions.endEffDate = this.formatDate(conditions.endEffDate);
          }
        } else {
          conditions.endEffDate = '';
        }
        this.queryBalanceSummarys({pageIndex: val, pageSize: this.pageSize, conditions: conditions});
      },
      orderSearch() {
        let self = this;
        let conditions = self.form;
        if (conditions.startEffDate !== '' && conditions.startEffDate !== undefined) {
          if (conditions.startEffDate.toString().indexOf('-') < 0) {
            conditions.startEffDate = this.formatDate(conditions.startEffDate);
          }
        } else {
          conditions.startEffDate = '';
        }
        if (conditions.endEffDate !== '' && conditions.endEffDate !== undefined) {
          if (conditions.endEffDate.toString().indexOf('-') < 0) {
            conditions.endEffDate = this.formatDate(conditions.endEffDate);
          }
        } else {
          conditions.endEffDate = '';
        }
        this.queryBalanceSummarys({conditions});
      },
      exportBalanceSummary() {
        let self = this;
        let conditions = self.form;
        if (conditions.startEffDate !== '' && conditions.startEffDate !== undefined) {
          if (conditions.startEffDate.toString().indexOf('-') < 0) {
            conditions.startEffDate = this.formatDate(conditions.startEffDate);
          }
        } else {
          conditions.startEffDate = '';
        }
        if (conditions.endEffDate !== '' && conditions.endEffDate !== undefined) {
          if (conditions.endEffDate.toString().indexOf('-') < 0) {
            conditions.endEffDate = this.formatDate(conditions.endEffDate);
          }
        } else {
          conditions.endEffDate = '';
        }
        this.exportBalanceSummaryExcel(conditions).then(Balance => {
          let blob = new Blob([Balance.data], {type: 'application/vnd.ms-excel'});
          let objectUrl = URL.createObjectURL(blob);
          window.location.href = objectUrl;
        });
      },
      formatDate(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? '0' + m : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '-' + m + '-' + d;
      }
    }
  }
</script>
