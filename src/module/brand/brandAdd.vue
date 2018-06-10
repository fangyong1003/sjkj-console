<!-- Created by ZHANGXI on 2018/1/14.
*/ -->
<template>
  <div>
    <nav class="panel">
      <div class="panel-block">
        <el-form ref="form" :rules="rules" :model="form" label-width="130px">
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">品牌管理</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="品牌名称" prop="name">
                <el-input v-model="form.name"/>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="排序" prop="score">
                <el-input type="number" min="0" v-model="form.score"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="是否在前端隐藏" prop="hidden">
                <el-select v-model="form.hidden" placeholder="是否在前端隐藏">
                  <el-option label="否" :value="false"/>
                  <el-option label="是" :value="true"/>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="品牌logo" prop="logo">
                <el-input v-model="form.logo" type="hidden"/>
                <el-upload
                  class="avatar-uploader"
                  action="string"
                  :http-request="upload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="form.logo" :src="form.logo" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
  import moduleStore from './bll/brandStore'
  import store from '../../store'
  import assignDeep from 'assign-deep'
  (!store.state.sysBrand) && store.registerModule('sysBrand', moduleStore)

  export default{
    data() {
      return {
        pageModel: 'ADD',
        form: {
          name: '',
          logo: '',
          score: 0,
          hidden: ''
        },
        rules: {
          name: [
            {required: true, message: '品牌名称必填'}
          ],
          logo: [
            {required: true, message: 'logo必填'}
          ],
          score: [
            {required: true, message: '排序必填'}
          ],
          hidden: [
            {required: true, message: '是否在前端隐藏必填'}
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
      ...mapActions(['saveBrand', 'queryBrand', 'updateBrand', 'queryRootBrands', 'upLoadPicFromWeApp']),

      brandTypeChangeHandler(BrandType) {
        console.log(arguments);
        switch (BrandType) {
          case 0://directory
            this.rules.url[0].required = false;
            this.rules.path[0].required = false;
            break;
          case 1://menu
            this.rules.url[0].required = true;
            this.rules.path[0].required = true;
            break;
          case 2://data
            this.rules.url[0].required = false;
            this.rules.path[0].required = false;
            break;
        }
      },
      saveHandler() {
        let self = this;

        this.$refs.form.validate((valid) => {
          if (valid) {
            //继续添加 或 返回列表

            let brand = assignDeep({}, self.form);
            self[self.pageModel === 'ADD' ? 'saveBrand' : 'updateBrand'](brand).then(function () {
              if (self.pageModel === 'ADD') {
                self.$confirm('品牌添加成功', '提示', {
                  confirmButtonText: '继续添加',
                  cancelButtonText: '返回列表',
                  type: 'info'
                }).then(() => {
                  self.resetHandler();
                }).catch(() => {
                  self.$router.push('/brand/index');
                });
              } else {
                self.$confirm('品牌修改成功.', '提示', {
                  confirmButtonText: '留在页面',
                  cancelButtonText: '返回列表',
                  type: 'info'
                }).then(() => {
                }).catch(() => {
                  self.$router.push('/brand/index');
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
        this.queryRootBrands();

        if (this.$route.query) {
          const id = this.$route.query.id;
          if (id) {
            this.pageModel = 'EDIT'
            this.queryBrand({id}).then(brand => {
              console.log(brand);
              this.form = brand; //TODO 不是很优雅
              this.imageUrl = brand.logo;
            });
          }
        }
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
        console.log(file.name);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 20;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      upload (item) {
        console.log('myUpload...');
        let formData = new FormData()
        formData.append('multipartFile', item.file)
        console.log('上传图片接口-参数', item.file)
        this.upLoadPicFromWeApp(formData).then(data => {
          this.form.logo = moduleStore.state.brandUploadUrl;
          console.log('上传图片接口-数据', moduleStore.state.brandUploadUrl)
        }).catch(err => {
          this.$message.error('上传失败，请重新上传')
          console.log('报错', err)
        })
      }
    }
  }
</script>
