/**
* Created by ZHANGXI on 2018/1/13.
*/
<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" label-width="110px">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">供应商信息</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="供应商名" prop="supplierName">
            <el-input v-model="form.supplierName"/>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="入驻日期" prop="enterDate">
            <el-date-picker type="datetime"
                            v-model="form.enterDate" style="width:100%" :editable="false"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="营业执照" prop="businessLicense">
            <el-input v-model="form.businessLicense" type="hidden"/>
            <el-upload
              class="avatar-uploader"
              action="string"
              :http-request="uploadSupplier"
              :show-file-list="false">
              <img v-if="form.businessLicense" :src="form.businessLicense" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="执照授权" prop="produceLicenseAuthority">
            <el-input v-model="form.produceLicenseAuthority"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="银行名" prop="bankName">
            <el-select v-model="form.bankName" placeholder="银行名">
              <el-option
                v-for="item in optionsBank"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="银行账户" prop="bankAccount">
            <el-input v-model="form.bankAccount"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="支付周期" prop="billingFrequency">
            <el-select v-model="form.billingFrequency" placeholder="支付周期">
              <el-option
                v-for="item in optionsBilling"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="供应商状态" prop="status">
            <el-select v-model="form.status" placeholder="供应商状态">
              <el-option
                v-for="item in optionsStatus"
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
          <el-form-item label="联系人" prop="contacter">
            <el-input v-model="form.contacter"/>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="登录用户手机" prop="contact">
            <el-input v-model="form.contact" @blur="isvalidPhone(form.contact)"/>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<input type="hidden" v-model="form.businessLicense"/>-->
      <el-form-item>
        <el-button type="info" @click="saveHandler">保存</el-button>
        <el-button type="danger" @click="resetHandler">重置</el-button>
      </el-form-item>
    </el-form>
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
  import assignDeep from 'assign-deep'
  //  import dateUtil from '../../common/dateUtil'

  import moduleStore from './bll/supportStore'
  import store from '../../store'
  (!store.state.sysSupport) && store.registerModule('sysSupport', moduleStore)

  export default{
    data() {
      return {
        optionsStatus: [{
          value: 'ENTER',
          label: '入驻'
        }, {
          value: 'EXIT',
          label: '退出'
        }],
        optionsBilling: [{
          value: 'DAILY_PAY',
          label: '日结'
        }, {
          value: 'WEEKLY_PAY',
          label: '周结'
        }, {
          value: 'MONTHLY_PAY',
          label: '月结'
        }],
        optionsBank: [{
          value: 'CMB',
          label: '招商银行'
        }, {
          value: 'ICBC',
          label: '中国工商银行'
        }, {
          value: 'CCB',
          label: '中国建设银行'
        }, {
          value: 'PSBC',
          label: '中国邮政储蓄银行'
        }, {
          value: 'BOC',
          label: '中国银行'
        }],
        pageModel: 'ADD',
        form: {
          supplierName: '',
          status: '',
          billingFrequency: '',
          enterDate: Date.now(),
          businessLicense: '',
          logonUserId: '',
          bankName: '',
          produceLicenseAuthority: '',
          bankAccount: '',
          contacter: '',
          contact: ''
        },
        rules: {
          supplierName: [
            {required: true, message: ' 供应商名必填'}
          ],
          businessLicense: [
            {required: true, message: '营业执照必填'}
          ],
          enterDate: [
            {required: true, message: '入驻日期必填'}
          ],
          produceLicenseAuthority: [
            {required: true, message: '执照授权必填'}
          ],
          bankName: [
            {required: true, message: '银行名必填'}
          ],
          bankAccount: [
            {required: true, message: '银行账户必填'}
          ],
          billingFrequency: [
            {required: true, message: '支付周期必填'}
          ],
          status: [
            {required: true, message: '供应商状态必填'}
          ],
          contacter: [
            {required: true, message: '联系人必填'}
          ],
          contact: [
            {required: true, message: '登录用户手机必填'}
          ]
        }
      }
    },

    mounted() {
      this.initPage();
    },
    computed: {
      ...mapGetters(['getRootSupports'])
    },
    methods: {
      ...mapActions(['saveSupport', 'updateSupport', 'upLoadPicSupplier', 'querySupport']),
      saveHandler() {
        let self = this;
        this.$refs.form.validate((valid) => {
          this.isvalidPhone(self.form.contact)
          if (valid) {
            //继续添加 或 返回列表
            let exhibition = assignDeep({}, self.form);

            self[self.pageModel === 'ADD' ? 'saveSupport' : 'updateSupport'](exhibition).then(function () {
              if (self.pageModel === 'ADD') {
                self.$confirm('供应商添加成功', '提示', {
                  confirmButtonText: '继续添加',
                  cancelButtonText: '返回列表',
                  type: 'info'
                }).then(() => {
                  self.resetHandler();
                }).catch(() => {
                  self.$router.push('/support/index');
                });
              } else {
                self.$confirm('供应商修改成功.', '提示', {
                  confirmButtonText: '留在当前页面',
                  cancelButtonText: '返回列表',
                  type: 'info'
                }).then(() => {
                }).catch(() => {
                  self.$router.push('/support/index');
                });
              }

            })
          } else {
            this.$message({
              showClose: true,
              message: '请检查表单',
              type: '错误提示'
            });

            return false;
          }
        });
      },

      resetHandler() {
        this.$refs.form.resetFields();
      },

      initPage() {
        console.log(this.$route);
        if (this.$route.query) {
          const supportId = this.$route.query.supportId;
          if (supportId) {
            this.pageModel = 'EDIT'
            this.querySupport({supportId}).then(support => {
//              console.log(support);
//              this.imageUrl = support[0].businessLicense;
              this.form = support[0]; //TODO 不是很优雅
            });
          }
        }
      },
      uploadSupplier (item) {
        console.log('myUpload...');
        let formData = new FormData()
        formData.append('multipartFile', item.file)
        console.log('上传图片接口-参数', item.file)
        this.upLoadPicSupplier(formData).then(data => {
//          this.imageUrl = moduleStore.state.supportUploadUrl;
          this.form.businessLicense = moduleStore.state.supportUploadUrl;
//          console.log('上传图片接口-数据', data.body.fileUrl)
        }).catch(err => {
          this.$message.error('上传失败，请重新上传')
          console.log('报错', err)
        })
      },
      isvalidPhone(str) {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        if (!reg.test(str)) {
          this.$message.warning('请填写正确的手机号码');
        }
      }
    }
  }
</script>

