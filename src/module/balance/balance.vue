<template>
  <div>
    <div class="btn-group-wrapper">
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <el-row>
          <el-col :span="5">
            <el-form-item label="手机号码" prop="mobile">
              <el-input v-model="form.mobile"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="姓名" prop="userName">
              <el-input v-model="form.userName"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="生效开始时间" prop="startEffectiveDate">
              <el-date-picker type="date" format="yyyy-MM-dd"
                              v-model="form.startEffectiveDate" style="width:100%"/>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="生效结束时间" prop="endEffectiveDate">
              <el-date-picker type="date" format="yyyy-MM-dd"
                              v-model="form.endEffectiveDate" style="width:100%"/>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="orderSearch" style="margin-left: 10px">查询</el-button>
            <el-button type="success" @click="exportBalance">导出Excel</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-table :data="balanceList" height="470" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler"
              style="width: 100%">

      <!--<el-table-column type="index" width="60"/>-->
      <el-table-column prop="mobile" label="手机号码" width="150"/>
      <el-table-column prop="name" label="姓名" width="100"/>
      <el-table-column prop="effectiveDate" label="生效日期" width="150"/>
      <el-table-column prop="openBalance" label="期初余额" width="100">
        <template scope="scope">
          {{scope.row.openBalance/100}}
        </template>
      </el-table-column>
      <el-table-column prop="openCredit" label="期初点石金" width="100">
        <template scope="scope">
          {{scope.row.openCredit/100}}
        </template>
      </el-table-column>
      <el-table-column prop="openProperty" label="期初点石金红包" width="150">
        <template scope="scope">
          {{scope.row.openProperty/100}}
        </template>
      </el-table-column>
      <el-table-column prop="closeBalance" label="期末余额" width="100">
        <template scope="scope">
          {{scope.row.closeBalance/100}}
        </template>
      </el-table-column>
      <el-table-column prop="closeCredit" label="期末点石金" width="100">
        <template scope="scope">
          {{scope.row.closeCredit/100}}
        </template>
      </el-table-column>
      <el-table-column prop="closeProperty" label="期末点石金红包" width="150">
        <template scope="scope">
          {{scope.row.closeProperty/100}}
        </template>
      </el-table-column>
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
          mobile: '',
          userName: '',
          startEffectiveDate: new Date(),
          endEffectiveDate: new Date()
        },
        currentPage: 1,
        pageSize: 10,
        currentSelectedRecord: null
      }
    },
    computed: {
      balanceList() {
        return this.$store.state.sysBalance.balances;
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
      ...mapActions(['queryBalances', 'exportBalanceExcel']),

      initPage() {
        let self = this;
        let conditions = self.form;
        if (conditions.startEffectiveDate !== '' && conditions.startEffectiveDate !== undefined) {
          conditions.startEffectiveDate = this.formatDate(conditions.startEffectiveDate);
        } else {
          conditions.startEffectiveDate = '';
        }
        if (conditions.endEffectiveDate !== '' && conditions.endEffectiveDate !== undefined) {
          conditions.endEffectiveDate = this.formatDate(conditions.endEffectiveDate);
        } else {
          conditions.endEffectiveDate = '';
        }
        this.queryBalances({conditions});
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
        if (conditions.startEffectiveDate !== '' && conditions.startEffectiveDate !== undefined) {
          if (conditions.startEffectiveDate.toString().indexOf('-') < 0) {
            conditions.startEffectiveDate = this.formatDate(conditions.startEffectiveDate);
          }
        } else {
          conditions.startEffectiveDate = '';
        }
        if (conditions.endEffectiveDate !== '' && conditions.endEffectiveDate !== undefined) {
          if (conditions.endEffectiveDate.toString().indexOf('-') < 0) {
            conditions.endEffectiveDate = this.formatDate(conditions.endEffectiveDate);
          }
        } else {
          conditions.endEffectiveDate = '';
        }
        this.queryBalances({pageIndex: this.currentPage, pageSize: val, conditions: conditions});
      },

      handleCurrentChange (val) {
        console.log(arguments);
        console.log(`current${val}`);
        this.currentPage = val;
        let self = this;
        let conditions = self.form;
        if (conditions.startEffectiveDate !== '' && conditions.startEffectiveDate !== undefined) {
          if (conditions.startEffectiveDate.toString().indexOf('-') < 0) {
            conditions.startEffectiveDate = this.formatDate(conditions.startEffectiveDate);
          }
        } else {
          conditions.startEffectiveDate = '';
        }
        if (conditions.endEffectiveDate !== '' && conditions.endEffectiveDate !== undefined) {
          if (conditions.endEffectiveDate.toString().indexOf('-') < 0) {
            conditions.endEffectiveDate = this.formatDate(conditions.endEffectiveDate);
          }
        } else {
          conditions.endEffectiveDate = '';
        }
        this.queryBalances({pageIndex: val, pageSize: this.pageSize, conditions: conditions});
      },
      orderSearch() {
        let self = this;
        let conditions = self.form;
        if (conditions.startEffectiveDate !== '' && conditions.startEffectiveDate !== undefined) {
          if (conditions.startEffectiveDate.toString().indexOf('-') < 0) {
            conditions.startEffectiveDate = this.formatDate(conditions.startEffectiveDate);
          }
        } else {
          conditions.startEffectiveDate = '';
        }
        if (conditions.endEffectiveDate !== '' && conditions.endEffectiveDate !== undefined) {
          if (conditions.endEffectiveDate.toString().indexOf('-') < 0) {
            conditions.endEffectiveDate = this.formatDate(conditions.endEffectiveDate);
          }
        } else {
          conditions.endEffectiveDate = '';
        }
        this.queryBalances({conditions});
      },
      exportBalance() {
        let self = this;
        let conditions = self.form;
        console.log(conditions);
        if (conditions.startEffectiveDate !== '' && conditions.startEffectiveDate !== undefined) {
          if (conditions.startEffectiveDate.toString().indexOf('-') < 0) {
            conditions.startEffectiveDate = this.formatDate(conditions.startEffectiveDate);
          }
        } else {
          conditions.startEffectiveDate = '';
        }
        if (conditions.endEffectiveDate !== '' && conditions.endEffectiveDate !== undefined) {
          if (conditions.endEffectiveDate.toString().indexOf('-') < 0) {
            conditions.endEffectiveDate = this.formatDate(conditions.endEffectiveDate);
          }
        } else {
          conditions.endEffectiveDate = '';
        }
        if (conditions.endEffectiveDate !== conditions.startEffectiveDate) {
          this.$message.warning('只能导出一天的数据');
          return;
        }
        this.exportBalanceExcel(conditions).then(Balance => {
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
