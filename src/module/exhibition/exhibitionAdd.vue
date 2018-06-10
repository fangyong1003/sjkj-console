<!-- Created by shi.pengyan on 2016-12-29. -->
<template>
  <div>
    <el-form ref="form" :rules="rules" :model="form" label-width="110px">
      <el-row>
        <el-col :span="24">
          <div class="grid-content bg-purple-dark">会场信息</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="14">
          <el-form-item label="会场名称" prop="name">
            <el-input v-model="form.name" :disabled="pageModel==='VIEW'"/>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="类型" prop="type">
            <el-select v-model="form.type" placeholder="类型" :disabled="pageModel==='VIEW'">
              <el-option label="会场" :value="1"/>
              <el-option label="活动" :value="2"/>
              <el-option label="单品推荐" :value="3"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="7">
          <el-form-item label="开始时间" prop="startAt">
            <el-date-picker type="datetime"
                            v-model="form.startAt" style="width:100%" :editable="false"
                            :picker-options="pickerBeginDateBefore" @change="checkDate" :disabled="pageModel==='VIEW'"/>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="截止时间" prop="endAt">
            <el-date-picker type="datetime"
                            v-model="form.endAt" style="width: 100%;" :editable="false"
                            :picker-options="pickerBeginDateAfter"
                            :disabled="!(this.form.startAt&&pageModel!=='VIEW')"/>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="点石金专场" prop="onlyCreditFlag">
            <el-select v-model="form.onlyCreditFlag" placeholder="点石金专场" :disabled="pageModel==='VIEW'">
              <el-option label="是" :value="1"/>
              <el-option label="否" :value="-1"/>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="主图" prop="mainPhoto">
            <el-input v-model="form.mainPhoto" type="hidden"/>
            <el-upload
              class="avatar-uploader"
              action="string"
              :http-request="uploadMain"
              :show-file-list="false">
              <img v-if="form.mainPhoto" :src="form.mainPhoto" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="导航图" prop="navigatePhoto">
            <el-input v-model="form.navigatePhoto" type="hidden"/>
            <el-upload
              class="avatar-uploader"
              action="string"
              :http-request="uploadNavigate"
              :show-file-list="false">
              <img v-if="form.navigatePhoto" :src="form.navigatePhoto" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="20">
          <el-form-item label="描述 " prop="description">
            <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}"
                      v-model="form.description" :disabled="pageModel==='VIEW'" :maxlength="500">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<input type="hidden" v-model="form.mainPhoto"/>-->
      <!--<input type="hidden" v-model="form.navigatePhoto"/>-->
      <el-form-item>
        <el-button type="info" @click="saveHandler" v-show="pageModel==='EDIT'||pageModel==='ADD'">保存</el-button>
        <el-button type="danger" @click="resetHandler" v-show="pageModel==='EDIT'||pageModel==='ADD'">重置</el-button>
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

  import moduleStore from './bll/exhibitionStore'
  import store from '../../store'
  (!store.state.sysExhibition) && store.registerModule('sysExhibition', moduleStore)

  export default{
    data() {
      return {
        pageModel: 'ADD',
        form: {
          name: '',
          status: '',
          type: '',
          startAt: '',
          endAt: '',
          navigatePhoto: '',
          mainPhoto: '',
          description: '',
          onlyCreditFlag: -1
        },
        pickerBeginDateBefore: this.beginDate(),
        pickerBeginDateAfter: this.processDate(),
        rules: {
          mainPhoto: [
            {required: true, message: '主图必填'}
          ],
          navigatePhoto: [
            {required: true, message: '导航图必填'}
          ],
          name: [
            {required: true, message: '会场名称必填'}
          ],
          startAt: [
            {required: true, message: '开始时间必填'}
          ],
          endAt: [
            {required: true, message: '开始时间必填'}
          ],
          type: [
            {required: true, message: '类型必填'}
          ],
          description: [
            {required: true, message: '描述必填'}
          ],
          onlyCreditFlag: [
            {required: true, message: '点石金专场必填'}
          ]
        }
      }
    },

    mounted() {
      this.initPage();
    },
    computed: {
      ...mapGetters(['getRootBrands'])
    },
    methods: {
      ...mapActions(['saveExhibition', 'queryExhibition', 'updateExhibition', 'upLoadPicMain', 'upLoadPicNavigate']),
      saveHandler() {
        let self = this;
        if (self.form.endAt) {
          if (self.form.startAt > self.form.endAt) {
            this.$message.error('开始时间不能大于结束时间')
            return
          }
        }
        this.$refs.form.validate((valid) => {
          if (valid) {
            //继续添加 或 返回列表
            let exhibition = assignDeep({}, self.form);

            self[self.pageModel === 'ADD' ? 'saveExhibition' : 'updateExhibition'](exhibition).then(function () {
              if (self.pageModel === 'ADD') {
                self.$confirm('会场添加成功', '提示', {
                  confirmButtonText: '继续添加',
                  cancelButtonText: '返回列表',
                  type: 'info'
                }).then(() => {
                  self.resetHandler();
                }).catch(() => {
                  self.$router.push('/exhibition/index');
                });
              } else {

                self.$confirm('会场修改成功.', '提示', {
                  confirmButtonText: '留在当前页面',
                  cancelButtonText: '返回列表',
                  type: 'info'
                }).then(() => {
                }).catch(() => {
                  self.$router.push('/exhibition/index');
                });
              }

            })
          } else {
            this.$message({
              showClose: true,
              message: '请检查表单.',
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
          const id = this.$route.query.id;
          if (id) {
            this.pageModel = this.$route.query.type
            this.queryExhibition({id}).then(exhibition => {
              console.log(exhibition);
//              this.imageMainUrl = exhibition.mainPhoto;
//              this.imageNavigateUrl = exhibition.navigatePhoto;
              exhibition.onlyCreditFlag = parseInt(exhibition.onlyCreditFlag);
              this.form = exhibition; //TODO 不是很优雅
            });
          }
        }
      },
      uploadMain (item) {
        console.log('myUpload...');
        let formData = new FormData()
        formData.append('multipartFile', item.file)
        console.log('上传图片接口-参数', item.file)
        this.upLoadPicMain(formData).then(data => {
//          this.imageMainUrl = moduleStore.state.exhibitionMainUploadUrl;
          this.form.mainPhoto = moduleStore.state.exhibitionMainUploadUrl;
//          console.log('上传图片接口-数据', data.body.fileUrl)
        }).catch(err => {
          this.$message.error('上传失败，请重新上传')
          console.log('报错', err)
        })
      },
      uploadNavigate (item) {
        console.log('myUpload...');
        let formData = new FormData()
        formData.append('multipartFile', item.file)
        console.log('上传图片接口-参数', item.file)
        this.upLoadPicNavigate(formData).then(data => {
//          this.imageNavigateUrl = moduleStore.state.exhibitionNavigateUploadUrl;
          this.form.navigatePhoto = moduleStore.state.exhibitionNavigateUploadUrl;
//          console.log('上传图片接口-数据', data.body.fileUrl)
        }).catch(err => {
          this.$message.error('上传失败，请重新上传')
          console.log('报错', err)
        })
      },
      //提出开始时间必须小于今天
      beginDate() {
        return {
          disabledDate(time) {
            return time.getTime() < Date.now()//开始时间不选时，结束时间最大值小于等于当天
          }
        }
      },
      //提出结束时间必须大于提出开始时间
      processDate() {
        let self = this
        return {
          disabledDate(time) {
            if (self.form.startAt) {
              return new Date(self.form.startAt).getTime() > time.getTime()
            } else {
              return time.getTime() < Date.now()
            }
          }
        }
      },
      checkDate() {
        let self = this
        if (self.form.endAt) {
          if (self.form.startAt > self.form.endAt) {
            this.$message.error('开始时间不能大于结束时间')
            return
          }
        }
      }
    }
  }
</script>
