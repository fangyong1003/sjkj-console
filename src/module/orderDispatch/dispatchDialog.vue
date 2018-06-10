<template>
  <div>

    <el-dialog ref="dialog" title="发货信息"
               v-model="dialogVisible"
               @close="closeDialogHandler">

      <el-form ref="form" :rules="rules" :model="form" label-width="100px">
        <el-row>
          <el-col :span="18">
            <el-form-item label="快递单号" prop="expressNo">
              <el-input v-model="form.expressNo"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="18">
            <el-form-item label="快递公司" prop="expressCode">
              <!--<el-input v-model="form.categoryId"/>-->
              <el-select v-model="form.expressCode" placeholder="请选择">
                <el-option
                  v-for="item in expressList"
                  :key="item.paramCode"
                  :label="item.paramValue"
                  :value="item.paramCode">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="info" @click="saveHandler">保存</el-button>
          <el-button type="danger" @click="okHandler">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script type="text/babel">
  import { mapActions } from 'vuex'

  import moduleStore from './bll/orderDispatchStore'
  import store from '../../store'
  (!store.state.sysOrderDispatch) && store.registerModule('sysOrderDispatch', moduleStore)

  export default{
    data() {
      return {
        expressList: [],
        dialogVisible: false,
        orderId: '',
        form: {
          expressCode: '',
          expressNo: ''
        },
        rules: {
          expressCode: [
            {required: true, message: '快递公司必填'}
          ],
          expressNo: [
            {required: true, message: '快递单号必填'}
          ]
        }
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
      ...mapActions(['queryExpressList', 'dispatch']),

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

      saveHandler() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$confirm('确定发货?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              let info = {
                'orderId': this.orderId,
                'expressCode': this.form.expressCode.toString(),
                'expressNo': this.form.expressNo.toString()
              };
              this.dispatch(info).then(data => {
                this.$message.success('发货成功');
                this.dialogVisible = false;
                this.closeHandler();
              });
            });
          }
        });
      },

      open(orderId) {
        this.orderId = orderId;
        this.dialogVisible = true;
        this.queryExpressList().then(expresss => {
          this.expressList = expresss
        });
        this.form.expressCode = '';
        this.form.expressNo = '';
      },
      close() {
        this.dialogVisible = false;
      }
    }
  }
</script>

