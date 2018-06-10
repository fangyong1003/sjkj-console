<template>
  <div>
    <el-dialog ref="dialog" title="订单信息"
               v-model="dialogVisible"
               @close="closeDialogHandler">
      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="订单流水号:">
              {{form.orderSerialNo}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单时间:">
              {{form.orderTime}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="支付方式:">
              {{form.paymentTypeString}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单金额(元):">
              <a v-show="form.paymentType==='balance'">
                余额{{form.orderPaidBalanceString}}
              </a>
              <a v-show="form.paymentType==='cash'">
                现金{{form.orderPaidCashString}}
              </a>
              <a v-show="form.paymentType==='credit'">
                点石金{{form.orderPaidCreditsString}}
              </a>
              <a v-show="form.paymentType==='cash_credit'">
                现金{{form.orderPaidCashString}}+点石金{{form.orderPaidCreditsString}}
              </a>
              <a v-show="form.paymentType==='balance_credit'">
                余额{{form.orderPaidBalanceString}}+点石金{{form.orderPaidCreditsString}}
              </a>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="订单商品数量:">
              {{form.orderGoodsNumber}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="姓名:">
              {{form.expressRecipientName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="手机号:">
              {{form.expressRecipientMobile}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收货人:">
              {{form.expressRecipientName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="收货人电话:">
              {{form.expressRecipientMobile}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="收货地址:">
              {{form.expressAddress}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="快递名称:">
              {{form.expressNameString}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="快递单号:">
              {{form.expressNo}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <table class="ruleTable">
            <thead>
            <tr>
              <th>商品图片</th>
              <th>商品名称</th>
              <th>单价</th>
              <th>数量</th>
              <th>总额</th>
            </tr>
            </thead>
            <tbody v-for="(val, key) in form.orderGoodsList">
            <tr>
              <td><img v-if="val.image[0]" :src="val.image[0]" class="avatar">
              </td>
              <td>{{val.goodsName}}
              </td>
              <td v-show="form.paymentType==='balance'">
                余额{{val.goodsPaidBalanceString}}
              </td>
              <td v-show="form.paymentType==='cash'">
                现金{{val.goodsPaidCashString}}
              </td>
              <td v-show="form.paymentType==='credit'">
                点石金{{val.goodsPaidCreditsString}}
              </td>
              <td v-show="form.paymentType==='cash_credit'">
                现金{{val.goodsPaidCashString}}+点石金{{val.goodsPaidCreditsString}}
              </td>
              <td v-show="form.paymentType==='balance_credit'">
                余额{{val.goodsPaidBalanceString}}+点石金{{val.goodsPaidCreditsString}}
              </td>
              <td>{{val.quantity}}
              </td>
              <td v-show="form.paymentType==='balance'">
                余额{{val.goodsPaidBalanceString*val.quantity}}
              </td>
              <td v-show="form.paymentType==='cash'">
                现金{{val.goodsPaidCashString*val.quantity}}
              </td>
              <td v-show="form.paymentType==='credit'">
                点石金{{val.goodsPaidCreditsString*val.quantity}}
              </td>
              <td v-show="form.paymentType==='cash_credit'">
                现金{{val.goodsPaidCashString*val.quantity}}+点石金{{val.goodsPaidCreditsString*val.quantity}}
              </td>
              <td v-show="form.paymentType==='balance_credit'">
                余额{{val.goodsPaidBalanceString*val.quantity}}+点石金{{val.goodsPaidCreditsString*val.quantity}}
              </td>
            </tr>
            </tbody>
            <tfoot>
            </tfoot>
          </table>
        </el-row>
        <el-form-item>
          <el-button type="danger" @click="okHandler" style="float: right">关闭</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<style>
  .ruleTable {
    width: 100%;
    background-color: #fff;
    text-align: left;
    border-spacing: 0;
  }

  .ruleTable tr th {
    border: 1px solid #e5e5e5;
    padding: 10px 8px;
    font-weight: 400;
    font-size: 13px;
    width: 100px;
  }

  .ruleTable tr td {
    border: 1px solid #e5e5e5;
    padding: 8px;
    font-size: 13px;
    font-weight: 400;
    vertical-align: middle;
  }

  .avatar {
    width: 80px;
    height: 80px;
    display: block;
  }
</style>
<script type="text/babel">

  import { mapActions } from 'vuex'

  import moduleStore from './bll/orderDispatchStore'
  import store from '../../store'
  (!store.state.sysOrderDispatch) && store.registerModule('sysOrderDispatch', moduleStore)

  export default{
    data() {
      return {
        dialogVisible: false,
        form: {
          expressCode: '',
          expressNo: ''
        },
        rules: {}
      }
    },
    props: {
      closeHandler: {
        type: Function
      }
    },
    computed: {},
    mounted() {
    },

    methods: {
      ...mapActions(['queryOrderDetail']),

      formatterHandler (row, column) {
        switch (column.property) {
          case 'state':
            return row.state === 'A' ? 'Yes' : 'Discard';
        }
      },
      privTypeFormatterHandler (row, column) {
        switch (column.property) {
          case 'type':
            switch (row.type) {
              case 0:
                return 'Directory';
              case 1:
                return 'Menu';
              case 2:
                return 'Data';
            }
            break;
        }
      },
      closeDialogHandler() {
        console.log('close user dialog');
      },

      okHandler() {
        console.log('dialog ok handler');
        this.dialogVisible = false;
      },

      open(orderId) {
        this.dialogVisible = true;
        this.queryOrderDetail({orderId}).then(orderinfo => {
          this.form = orderinfo
        });
      },
      close() {
        this.dialogVisible = false;
      }
    }
  }
</script>


