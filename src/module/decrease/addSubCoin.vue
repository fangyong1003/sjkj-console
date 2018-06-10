<template>
  <div>
    <nav class="panel">
      <div class="panel-block">
        <el-form ref="form" :rules="rules" :model="form" label-width="130px">
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">加减币</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="资产类型" prop="type">
                <el-select v-model="form.type" placeholder="资产类型">
                  <el-option label="点石金" :value="0"/>
                  <el-option label="点石金红包" :value="1"/>
                  <el-option label="余额" :value="2"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="操作类型" prop="operateType">
                <el-select v-model="form.operateType" placeholder="操作类型">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="手机号" prop="mobile">
                <el-input v-model="form.mobile"/>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="金额" prop="amount">
                <el-input type="number" min="0" v-model="form.amount"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="备注" prop="reason">
                <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 6}"
                          v-model="form.reason" :maxlength="100">
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="info" @click="saveHandler">保存</el-button>
            <el-button type="danger" @click="resetHandler">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </nav>
  </div>
</template>
<style>
  .bg-purple-dark {
    background: #99a9bf;
    height: 37px;
    line-height: 37px;
    padding-left: 5px
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    margin-bottom: 7px
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<script type="text/babel">
  import { mapActions, mapGetters } from 'vuex'
  import moduleStore from './bll/decreaseStore'
  import store from '../../store'
  import assignDeep from 'assign-deep'
  (!store.state.sysDecrease) && store.registerModule('sysDecrease', moduleStore)

  export default{
    data() {
      return {
        form: {
          type: '',
          operateType: '',
          mobile: '',
          amount: 0,
          reason: ''
        },
        type: '',
        options: [{
          value: 'PLUS',
          label: '加币'
        }, {
          value: 'MINUS',
          label: '减币'
        }],
        rules: {
          type: [
            {required: true, message: '操作类型必填'}
          ],
          operateType: [
            {required: true, message: '操作类型必填'}
          ],
          mobile: [
            {required: true, message: '手机号必填'}
          ],
          amount: [
            {required: true, message: '金额必填'}
          ],
          reason: [
            {required: true, message: '备注必填'}
          ]
        }
      }
    },
    computed: {
      ...mapGetters(['getRootBrands'])
    },
    methods: {
      ...mapActions(['decreaseBalance', 'decreaseCredit', 'decreaseProperty']),

      resetHandler() {
        this.$refs.form.resetFields();
      },
      saveHandler() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            let self = this;
            let info = assignDeep({}, self.form);
            if (!info.amount) {
              this.$message.warning('金额大于0');
              return;
            }
            this.$confirm(info.operateType === 'PLUS' ? '确定加币?' : '确定减币?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {

              if (info.type === 2) {
                this.decreaseBalance(info).then(data => {
                  this.$message.success(info.operateType === 'PLUS' ? '加币成功' : '减币成功');
                });
              } else if (info.type === 1) {
                this.decreaseProperty(info).then(data => {
                  this.$message.success(info.operateType === 'PLUS' ? '加币成功' : '减币成功');
                });
              } else {
                this.decreaseCredit(info).then(data => {
                  this.$message.success(info.operateType === 'PLUS' ? '加币成功' : '减币成功');
                });
              }
            });
          }
        });
      }
    }
  }
</script>
