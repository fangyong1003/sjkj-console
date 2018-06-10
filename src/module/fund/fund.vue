<template>
  <div>
    <div class="btn-group-wrapper">
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <el-row>
          <el-col :span="6">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="form.name"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号码" prop="mobile">
              <el-input v-model="form.mobile"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="资金类型" prop="flowType">
              <el-select v-model="form.flowType" placeholder="请选择" clearable>
                <el-option
                  v-for="item in flowTypeList"
                  :key="item.paramCode"
                  :label="item.paramValue"
                  :value="item.paramCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="变动类型" prop="flowSecondType">
              <el-select v-model="form.flowSecondType" placeholder="请选择" clearable>
                <el-option
                  v-for="item in flowSecondTypeList"
                  :key="item.paramCode"
                  :label="item.paramValue"
                  :value="item.paramCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="开始时间" prop="startDateTime">
              <el-date-picker type="datetime"
                              v-model="form.startDateTime" style="width:100%"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结束时间" prop="endDateTime">
              <el-date-picker type="datetime"
                              v-model="form.endDateTime" style="width:100%"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="orderSearch" style="margin-left: 30px">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-table :data="fundList" height="470" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler"
              style="width: 100%">
      <!--<el-table-column type="index" width="60"/>-->
      <el-table-column prop="userId" label="用户编号" width="100"/>
      <el-table-column prop="mobile" label="手机号码" width="150"/>
      <el-table-column prop="name" label="姓名" width="150"/>
      <el-table-column prop="flowId" label="流水编号" width="100"/>
      <el-table-column prop="flowAmount" label="变动金额" width="100">
        <template scope="scope">
          {{scope.row.flowAmount/100}}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="变动时间" width="200"/>
      <el-table-column prop="flowTypeString" label="资金类型" width="150"/>
      <el-table-column prop="flowSecondTypeString" label="变动类型" width="150"/>
      <el-table-column prop="flowRemark" label="变动说明	" width="200"/>
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

  import moduleStore from './bll/fundStore'
  import store from '../../store'
  //  import Vue from 'vue'
  (!store.state.sysFund) && store.registerModule('sysFund', moduleStore)


  export default{
    data() {
      return {
        form: {
          name: '',
          mobile: '',
          flowType: '',
          flowSecondType: '',
          startDateTime: '',
          endDateTime: ''
        },
        currentPage: 1,
        pageSize: 10,
        currentSelectedRecord: null,
        flowTypeList: [],
        flowSecondTypeList: []
      }
    },
    computed: {
      fundList() {
        return this.$store.state.sysFund.funds;
      },
      totalCount() {
        return this.$store.state.sysFund.totalCount;
      }
    },
    mounted() {
      console.log('[ProductType Page] mounted');
      this.initPage();
    },

    methods: {
      ...mapActions(['queryFunds', 'queryFlowTypeList', 'queryFlowSecondTypeList']),

      initPage() {
        let self = this;
        this.queryFlowTypeList().then(flowTypes => {
          self.flowTypeList = flowTypes
        });
        this.queryFlowSecondTypeList().then(flowSecondTypes => {
          self.flowSecondTypeList = flowSecondTypes
        });
        let conditions = self.form;
        this.queryFunds({conditions});
      },

      changeStateHandler (row) {
//        if (row.withdrawStatus !== 'WAITING') {
//          this.$message.warning('请选择待处理数据');
//          return;
//        }
////        if (row.withdrawAmount + row.withdrawFee > 2) {
////          this.$message.warning('提现金额不能超过2元');
////          return;
////        }
//        this.$confirm('确定付款?', '提示', {
//          confirmButtonText: '确定',
//          cancelButtonText: '取消',
//          type: 'warning'
//        }).then(() => {
//          let info = {
//            'withdrawId': row.withdrawId
//          };
//          this.withdraw(info).then(data => {
//            this.$message.success('付款成功');
//            this.queryOrderDispatchs();
//          });
//        });
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
        this.queryFunds({pageIndex: this.currentPage, pageSize: val, conditions: conditions});
      },

      handleCurrentChange (val) {
        console.log(arguments);
        console.log(`current${val}`);
        this.currentPage = val;
        let self = this;
        let conditions = self.form;
        this.queryFunds({pageIndex: val, pageSize: this.pageSize, conditions: conditions});
      },
      orderSearch() {
        let self = this;
        let conditions = self.form;
        this.queryFunds({conditions});
      }
    }
  }
</script>
