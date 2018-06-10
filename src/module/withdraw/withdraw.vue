<template>
  <div>
    <div class="btn-group-wrapper">
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item label="商户订单号" prop="name">
          <el-input v-model="form.serialNo"/>
        </el-form-item>
        <el-form-item label="手机号" prop="name">
          <el-input v-model="form.userMobile"/>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input/>
        </el-form-item>
        <el-form-item label="开始时间" prop="beginCreateDate">
          <el-date-picker type="datetime"
                          v-model="form.beginCreateDate" style="width:100%"/>
        </el-form-item>
        <el-form-item label="结束时间" prop="endCreateDate">
          <el-date-picker type="datetime"
                          v-model="form.endCreateDate" style="width:100%"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="orderSearch" >查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="withdrawList" height="420" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler"
              style="width: 100%">

      <!--<el-table-column type="index" width="60"/>-->
      <el-table-column prop="withdrawSerialNo" label="商户订单号" width="200"/>
      <el-table-column prop="userMobile" label="手机号" width="150"/>
      <el-table-column prop="userName" label="姓名" width="150"/>
      <el-table-column prop="identityCard" label="身份证" width="200"/>
      <el-table-column prop="bankName" label="银行卡名称" width="150"/>
      <el-table-column prop="bankCard" label="银行卡账号" width="200"/>
      <el-table-column prop="withdrawDate" label="提现时间" width="150"/>
      <el-table-column prop="withdrawAmount" label="提现金额" width="100"/>
      <el-table-column prop="withdrawFee" label="手续费" width="100"/>
      <el-table-column prop="withdrawAmount" label="实际到账金额" width="110">
        <template scope="scope">
          {{scope.row.withdrawAmount-scope.row.withdrawFee}}
        </template>
      </el-table-column>

      <el-table-column prop="withdrawStatus" fixed="right" label="状态" width="150" :formatter="formatterHandler"/>
      <el-table-column prop="title" fixed="right" label="操作" width="150">
        <template scope="scope">
          <el-button @click="changeStateHandler(scope.row)"
                     v-if="scope.row.withdrawStatus==='WAITING'||scope.row.withdrawStatus==='FAIL'" size="mini"
                     type="primary">打款
          </el-button>
          <el-button @click="checkFailHandler(scope.row)"
                     v-if="scope.row.withdrawStatus==='WAITING'||scope.row.withdrawStatus==='FAIL'" size="mini"
                     type="danger">审核不通过
          </el-button>
        </template>
      </el-table-column>
      <!--<el-table-column prop="bankCategory" label="银行卡编码" width="200"/>-->
      <!--<el-table-column prop="createTime" label="创建时间" width="200"/>-->
      <!--<el-table-column prop="serialNo" label="序列号" width="200"/>-->
      <!--<el-table-column prop="updateTime" label="更新时间" width="200"/>-->
      <!--<el-table-column prop="userId" label="用户ID" width="200"/>-->
      <!--<el-table-column prop="withdrawId" label="提现ID" width="200"/>-->
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

  import moduleStore from './bll/withdrawStore'
  import store from '../../store'
  //  import Vue from 'vue'
  (!store.state.sysWithdraw) && store.registerModule('sysWithdraw', moduleStore)


  export default{
    data() {
      return {
        form: {
          serialNo: '',
          userMobile: '',
          beginCreateDate: '',
          endCreateDate: ''
        },
        currentPage: 1,
        pageSize: 10,
        currentSelectedRecord: null
      }
    },
    computed: {
      withdrawList() {
        return this.$store.state.sysWithdraw.withdraws;
      },
      totalCount() {
        return this.$store.state.sysWithdraw.totalCount;
      }
    },
    mounted() {
      console.log('[ProductType Page] mounted');
      this.initPage();
    },

    methods: {
      ...mapActions(['queryWithdraws', 'withdraw', 'checkFail']),

      initPage() {
        let self = this;
        let conditions = self.form;
        this.queryWithdraws({conditions});
      },

      changeStateHandler (row) {
        if (row.withdrawStatus !== 'WAITING') {
          this.$message.warning('请选择待处理数据');
          return;
        }
        this.$confirm('确定打款?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let info = {
            'withdrawId': row.withdrawId
          };
          this.withdraw(info).then(data => {
            this.$message.success('付款成功');
            this.initPage()
          });
        });
      },

      formatterHandler (row, column) {
        switch (row.withdrawStatus) {
          case 'WAITING':
            return '待处理';
          case 'AUDIT_FAIL':
            return '审核失败';
          case 'PROCESSING':
            return '处理中';
          case 'SUCCESS':
            return '处理成功';
          case 'FAIL':
            return '提现失败';
        }
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
        this.queryWithdraws({pageIndex: this.currentPage, pageSize: val, conditions: conditions});
      },

      handleCurrentChange (val) {
        console.log(arguments);
        console.log(`current${val}`);
        this.currentPage = val;
        let self = this;
        let conditions = self.form;
        this.queryWithdraws({pageIndex: val, pageSize: this.pageSize, conditions: conditions});
      },
      orderSearch() {
        let self = this;
        let conditions = self.form;
        this.queryWithdraws({conditions});
      },
      checkFailHandler(row) {
        this.$prompt('请输入拒绝原因', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({ value }) => {
          let info = {
            'withdrawId': row.withdrawId,
            'remark': row.withdrawId
          };
          this.checkFail(info).then(data => {
            this.$message.success('审核不通过成功');
            this.initPage()
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '操作失败'
          });
        });
      }
    }
  }
</script>
