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
            <el-button type="success" @click="exportOrder">导出Excel</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <el-table :data="orderDispatchList" height="420" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler"
              style="width: 100%">
      <!--<el-table-column type="index" width="60"/>-->
      <el-table-column prop="mobile" label="手机号" width="150"/>
      <el-table-column prop="orderExpress.receiver" label="姓名" width="100"/>
      <el-table-column prop="supplierId" label="供应商编号" width="150"/>
      <el-table-column prop="serialNo" label="订单流水号" width="200"/>
      <el-table-column prop="paymentSerialNo" label="支付流水号" width="200"/>
      <el-table-column prop="title" label="订单金额(元)" width="200">
        <template scope="scope">
          <a v-show="scope.row.paymentType==='balance'">
            余额{{scope.row.paidBalanceString}}
          </a>
          <a v-show="scope.row.paymentType==='cash'">
            现金{{scope.row.paidCashString}}
          </a>
          <a v-show="scope.row.paymentType==='credit'">
            点石金{{scope.row.paidCreditsString}}
          </a>
          <a v-show="scope.row.paymentType==='cash_credit'">
            现金{{scope.row.paidCashString}}+点石金{{scope.row.paidCreditsString}}
          </a>
          <a v-show="scope.row.paymentType==='balance_credit'">
            余额{{scope.row.paidBalanceString}}+点石金{{scope.row.paidCreditsString}}
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="paymentType" label="支付方式" width="150" :formatter="formatterHandler"/>
      <el-table-column prop="paymentStatus" label="支付状态" width="150" :formatter="formatterHandler"/>
      <el-table-column prop="orderStatusString" fixed="right" label="订单状态" width="150"/>
      <!--<el-table-column prop="goodsNumber" label="商品数量" width="150"/>-->
      <el-table-column prop="title" fixed="right" label="操作" width="150">
        <template scope="scope">
          <el-button type="info" size="mini" @click="orderDetailHandler(scope.row)" plain>订单信息</el-button>
          <el-button @click="changeStateHandler(scope.row)" size="mini" v-if="scope.row.orderStatusString==='待发货'"
                     type="primary">发货
          </el-button>
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
    <dispatch-dialog ref="dispatchDialog" :closeHandler="orderlistLoad"/>
    <order-detail-dialog ref="orderDetailDialog"/>
  </div>
</template>

<style lang="scss">
  .btn-group-wrapper {
    padding-bottom: 4px;
  }
</style>

<script type="text/babel">
  import { mapActions } from 'vuex'

  import moduleStore from './bll/orderDispatchStore'
  import store from '../../store'
  import DispatchDialog from './dispatchDialog.vue'
  import orderDetailDialog from './orderDetailDialog.vue'
  //  import Vue from 'vue'
  (!store.state.sysOrderDispatch) && store.registerModule('sysOrderDispatch', moduleStore)

  //  import productTypeUtil from './bll/productTypeUtil';

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
      orderDispatchList() {
        return this.$store.state.sysOrderDispatch.orderDispatchs;
      },
      totalCount() {
        return this.$store.state.sysOrderDispatch.totalCount;
      }
    },
    components: {DispatchDialog, orderDetailDialog},
    mounted() {
      console.log('[ProductType Page] mounted');
      this.initPage();
    },

    methods: {
      ...mapActions(['queryOrderDispatchs', 'queryOrderDispatchCount', 'deleteProductType', 'dispatch', 'exportOrderDetail']),

      initPage() {
        let self = this;
        let conditions = self.form;
        this.queryOrderDispatchs({conditions});
//        this.queryOrderDispatchCount();
      },

      delHandler() {
        if (!this.currentSelectedRecord) {
          this.$message.warning('请选择一条记录');
          return;
        }
        this.$confirm('Are you sure to delete this record?', 'Confirm', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.deleteProductType({productTypeId: this.currentSelectedRecord.productTypeId}).then(data => {
            this.$message.success('Succeed in deleting priv record.');
            this.currentSelectedRecord = null;
          });
        })
      },

      changeStateHandler (row) {
        if (row.orderStatusString !== '待发货') {
          this.$message.warning('请选择待发货订单');
          return;
        }

        this.$refs.dispatchDialog.open(row.orderId);
      },

      orderDetailHandler(row) {
        this.$refs.orderDetailDialog.open(row.orderId);
      },

      formatterHandler (row, column) {
        switch (column.property) {
          case 'paymentStatus':
            return this.paymentStatus(row.paymentStatus);
          case 'paymentType':
            return this.paymentType(row.paymentType);
        }

      },

      paymentType(paymentType) {
        switch (paymentType) {
          case 'balance':
            return '余额';
          case 'cash':
            return '现金';
          case 'credit':
            return '点石金';
          case 'cash_credit':
            return '现金+点石金';
          case 'balance_credit':
            return '余额+点石金';
          default:
            return '';
        }
      },
      paymentStatus(paymentStatus) {
        switch (paymentStatus) {
          case 'PAYMENT_WAITING':
            return '等待支付';
          case 'PAYMENT_PROGRESSING':
            return '支付中';
          case 'PAYMENT_SUCCESS':
            return '支付成功';
          case 'PAYMENT_FAIL':
            return '支付失败';
          default:
            return '';
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
        this.queryOrderDispatchs({pageIndex: this.currentPage, pageSize: val, conditions: conditions});
      },
      handleCurrentChange (val) {
        console.log(arguments);
        console.log(`current${val}`);
        this.currentPage = val;
        let self = this;
        let conditions = self.form;
        this.queryOrderDispatchs({pageIndex: val, pageSize: this.pageSize, conditions: conditions});
      },
      orderSearch() {
        let self = this;
        let conditions = self.form;
        this.queryOrderDispatchs({conditions});
      },
      orderlistLoad() {
        let self = this;
        let conditions = self.form;
        this.queryOrderDispatchs({pageIndex: this.currentPage, pageSize: this.pageSize, conditions: conditions});
      },
      exportOrder() {
        let self = this;
        let conditions = self.form;
        this.exportOrderDetail(conditions).then(orderinfo => {
          let blob = new Blob([orderinfo.data], {type: 'application/vnd.ms-excel'});
          let objectUrl = URL.createObjectURL(blob);
          window.location.href = objectUrl;
        });
      }
    }
  }
</script>
