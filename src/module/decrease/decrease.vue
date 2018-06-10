<template>
  <div>
    <div class="btn-group-wrapper">
      <el-form ref="form" :model="form" label-width="100px" size="mini">
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单流水号" prop="name">
              <el-input v-model="form.serialNo"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="支付流水号" prop="name">
              <el-input v-model="form.paymentSerial"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="手机号" prop="name">
              <el-input v-model="form.mobile"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="支付状态" prop="paymentStatus">
              <el-select v-model="form.paymentStatus" clearable placeholder="支付状态">
                <el-option
                  v-for="item in optionsPays"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单状态" prop="orderStatus">
              <el-select v-model="form.orderStatus" clearable placeholder="订单状态">
                <el-option
                  v-for="item in optionsOrders"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="开始时间" prop="startTime">
              <el-date-picker type="datetime"
                              v-model="form.startTime" style="width:100%"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="结束时间" prop="EndTime">
              <el-date-picker type="datetime"
                              v-model="form.EndTime" style="width:100%"/>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" @click="orderSearch" style="margin-left: 30px">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-table :data="decreaseList" height="420" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler"
              style="width: 100%">

      <!--<el-table-column type="index" width="60"/>-->
      <el-table-column prop="mobile" label="手机号" width="150"/>
      <el-table-column prop="orderExpress.receiver" label="姓名" width="150"/>
      <el-table-column prop="" label="供应商编号" width="150"/>
      <el-table-column prop="serialNo" label="订单流水号" width="200"/>
      <el-table-column prop="paymentSerialNo" label="支付流水号" width="200"/>
      <el-table-column prop="" label="金额（元）" width="150"/>
      <el-table-column prop="" label="成本" width="150"/>
      <el-table-column prop="paymentStatus" label="支付状态" width="150"/>
      <el-table-column prop="orderStatusString"  fixed="right" label="订单状态" width="150"/>
      <!--<el-table-column prop="goodsNumber" label="商品数量" width="150"/>-->
      <el-table-column prop="title" fixed="right" label="操作" width="100">
        <template scope="scope">
          <el-button  size="mini" v-if="scope.row.orderStatusString==='待发货'">发货</el-button>
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

  import moduleStore from './bll/decreaseStore'
  import store from '../../store'
  //  import Vue from 'vue'
  (!store.state.sysDecrease) && store.registerModule('sysDecrease', moduleStore)


  export default{
    data() {
      return {
        optionsPays: [{
          value: 'PAYMENT_WAITING',
          label: '等待支付'
        }, {
          value: 'PAYMENT_PROGRESSING',
          label: '支付中'
        }, {
          value: 'PAYMENT_SUCCESS',
          label: '支付成功'
        }, {
          value: 'PAYMENT_FAIL',
          label: '支付失败'
        }],
        optionsOrders: [{
          value: 'WAITING_PAY',
          label: '待付款'
        }, {
          value: 'ORDER_CANCELED',
          label: '订单取消'
        }, {
          value: 'ORDER_EXPIRED',
          label: '订单失效'
        }, {
          value: 'WAITING_SHIPPING',
          label: '待发货'
        }, {
          value: 'WAIT_RECEIVING',
          label: '已发货'
        }, {
          value: 'ORDER_COMPLETION',
          label: '订单完成'
        }],
        form: {
          orderStatus: '',
          paymentStatus: '',
          startTime: '',
          EndTime: '',
          serialNo: '',
          mobile: '',
          paymentSerial: ''
        },
        currentPage: 1,
        pageSize: 10,
        currentSelectedRecord: null
      }
    },
    computed: {
      decreaseList() {
        return this.$store.state.sysDecrease.decreases;
      },
      totalCount() {
        return this.$store.state.sysDecrease.totalCount;
      }
    },
    mounted() {
      console.log('[ProductType Page] mounted');
      this.initPage();
    },

    methods: {
      ...mapActions(['queryDecreases']),

      initPage() {
        let self = this;
        let conditions = self.form;
        this.queryDecreases({conditions});
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

      formatterHandler (row, column) {
        switch (row.withdrawStatus) {
          case 'WAITING':
            return '待处理';
          case 'AUDIT_FAIL':
            return '审核失败';
          case 'PROCESSING':
            return '处理中';
          case 'SUCCESS':
            return '处理中';
          case 'FAIL':
            return '失败';
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
        this.queryDecreases({pageIndex: this.currentPage, pageSize: val, conditions: conditions});
      },

      handleCurrentChange (val) {
        console.log(arguments);
        console.log(`current${val}`);
        this.currentPage = val;
        let self = this;
        let conditions = self.form;
        this.queryDecreases({pageIndex: val, pageSize: this.pageSize, conditions: conditions});
      },
      orderSearch() {
        let self = this;
        let conditions = self.form;
        this.queryDecreases({conditions});
      }
    }
  }
</script>
