/**
* Created by ZHANGXI on 2018/1/14.
*/
<template>
  <div>
    <nav class="panel">
      <div class="panel-block">
        <el-form ref="form" :rules="rules" :model="form" label-width="100px">
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">基本信息</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="商品编码" prop="itemNo">
                <el-input v-model="form.itemNo"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="商品标题" prop="title">
                <el-input v-model="form.title"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="品牌" prop="brandId">
                <el-select v-model="form.brandId" placeholder="请选择">
                  <el-option
                    v-for="item in brandList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="分类" prop="categoryId">
                <!--<el-input v-model="form.categoryId"/>-->
                <el-select v-model="form.categoryId" placeholder="请选择">
                  <el-option
                    v-for="item in productTypeList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item class="is-required" label="标签">
                <el-tag
                  :key="tag"
                  v-for="tag in dynamicTags"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)">
                  {{tag}}
                </el-tag>
                <el-input
                  class="input-new-tag"
                  v-if="inputVisible"
                  v-model="inputValue"
                  ref="saveTagInput"
                  size="small"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                >
                </el-input>
                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新标签</el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="主图" class="is-required">
                <el-upload
                  class="upload-demo"
                  action="string"
                  :http-request="uploadMain"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :file-list="fileList2"
                  list-type="picture" disabled>
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">价格库存</div>
            </el-col>
          </el-row>
          <el-row>
            <div class="btn-group-wrapper bottom center">
              <el-button-group>
                <el-button type="info" @click="addRule">添加规格项目</el-button>
                <el-button type="danger" @click="delRule">删除规格项目</el-button>
              </el-button-group>
            </div>
          </el-row>
          <div v-for="n in ruleList">
            <el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="规格名" prop="ruleName">
                    <el-input v-model="ruleName"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <ul class="ruleList">
                  <li style="width: 100px">
                    <el-form-item label="规格值">
                    </el-form-item>
                  </li>
                  <div v-for="(val, key) in ruleValueList">
                    <li style="width: 110px;padding-bottom: 10px">
                      <el-input v-model="val.ruleValue" @blur="checkRuleValue(val.ruleValue)"/>
                    </li>
                    <li style="width: 50px;padding-bottom: 10px">
                      <el-button icon="delete" @click="delRuleValue(key)"/>
                    </li>
                  </div>
                  <li style="padding-bottom: 30px">
                    &nbsp;
                    <el-button icon="plus" @click="addRuleValue"/>
                    <!--<el-button icon="delete" @click="delRuleValue"/>-->
                  </li>
                </ul>
              </el-row>
            </el-row>
          </div>
          <div v-for="n in ruleTwoList">
            <el-row>
              <el-row>
                <el-col :span="6">
                  <el-form-item label="规格名" prop="ruleTwoName">
                    <el-input v-model="ruleTwoName"/>
                  </el-form-item>
                </el-col>
              </el-row>
              <ul class="ruleList">
                <li style="width: 100px">
                  <el-form-item label="规格值">
                  </el-form-item>
                </li>
                <div v-for="(val, key) in ruleTwoValueList">
                  <li style="width: 110px;padding-bottom: 10px">
                    <el-input v-model="val.ruleValue" @blur="checkRuleTwoValue(val.ruleValue)"/>
                  </li>
                  <li style="width: 50px;padding-bottom: 10px">
                    <el-button icon="delete" @click="delRuleTwoValue(key)"/>
                  </li>
                </div>
                <li style="padding-bottom: 30px">
                  &nbsp;
                  <el-button icon="plus" @click="addRuleTwoValue"/>
                </li>
              </ul>
            </el-row>
          </div>
          <!--List-->
          <el-row v-show="onePrice">
            <el-col :span="24">
              <div style="padding: 10px 5px 5px; border: 1px solid #e5e5e5;">
                <table class="ruleTable">
                  <thead>
                  <tr>
                    <th>{{ruleName}}</th>
                    <th v-show="ruleTwoFlag">{{ruleTwoName}}</th>
                    <th>成本价</th>
                    <th>结算价</th>
                    <th>库存</th>
                    <th>原价</th>
                    <th>销售价</th>
                    <th>返点石金</th>
                    <th>划分类型</th>
                    <th>现金</th>
                    <th>点石金</th>
                    <th>余额</th>
                    <!--<th>九洲宝</th>-->
                    <th>操作</th>
                  </tr>
                  </thead>
                  <tbody v-for="(val, key) in ruleDetailList">
                  <tr>
                    <td>{{val.ruleOne}}
                    </td>
                    <td v-show="ruleTwoFlag">{{val.ruleTwo}}
                    </td>
                    <td>
                      <el-input type="number" min="0" v-model="val.costPrice" :disabled="!(val.status===5)"/>
                    </td>
                    <td>
                      <el-input type="number" min="0" v-model="val.settlePrice" :disabled="!(val.status===5)"/>
                    </td>
                    <td>
                      <el-input type="number" min="0" v-model="val.stock" :disabled="!(val.status===5)"/>
                    </td>
                    <td>
                      <el-input type="number" min="0" v-model="val.originPrice" :disabled="!(val.status===6)"/>
                    </td>
                    <td>
                      <el-input type="number" min="0" v-model="val.sellPrice" :disabled="!(val.status===6)"/>
                    </td>
                    <td>
                      <el-input type="number" min="0" v-model="val.backDiamond" :disabled="!(val.status===6)"/>
                    </td>
                    <td style="width: 200px">
                      <el-select v-model="val.type" placeholder="请选择" :disabled="!(val.status===6)">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </td>
                    <td>
                      <el-input type="number" min="0" v-model="val.cash" v-show="val.type==='0'||val.type==='1'"
                                :disabled="!(val.status===6)"/>
                    </td>
                    <td>
                      <el-input type="number" min="0" v-model="val.diamond"
                                v-show="val.type==='0'||val.type==='1'||val.type==='6'" :disabled="!(val.status===6)"
                      />
                    </td>
                    <td>
                      <el-input type="number" min="0" v-model="val.remainder" v-show="val.type==='0'||val.type==='6'"
                                :disabled="!(val.status===6)"
                      />
                    </td>
                    <!--<td>-->
                    <!--<el-input  type="number" min="0" v-model="val.treasure" v-show="val.type==='2'||val.type==='4'||val.type==='5'"-->
                    <!--:disabled="!(val.status===6)"/>-->
                    <!--</td>-->
                    <td style="width: 145px">
                      <el-button-group>
                        <el-button type="primary" size="small" v-show="val.stock===0&&val.status!==5"
                                   @click="productStock(val)">进货
                        </el-button>
                        <el-button type="primary" size="small" v-show="val.status===5" @click="saveProductStock(val)">
                          进货保存
                        </el-button>
                        <el-button type="primary" size="small"
                                   v-show="val.status!==undefined&&((val.stock!==0&&val.settlePrice!==0)&&(val.status!==6&&val.status!==5))"
                                   @click="productPrice(val)">售价更新
                        </el-button>
                        <el-button type="primary" size="small" v-show="val.status===6" @click="saveProductPrice(val)">
                          售价保存
                        </el-button>
                        <el-button type="primary" size="small"
                                   v-show="val.status!==undefined&&((val.status===-1||val.sellPrice!==0)&&val.status!==6)&&val.status!==1"
                                   @click="ruleUp(val)">上架
                        </el-button>
                        <el-button type="danger" size="small" v-show="val.status===1" @click="ruleDown(val)">下架
                        </el-button>
                      </el-button-group>
                    </td>
                  </tr>
                  </tbody>
                  <tfoot>
                  </tfoot>
                </table>
              </div>
            </el-col>
          </el-row>
          <!--<el-row>-->
          <!--<div v-for="(val, key) in ruleValueListT ">-->
          <!--<el-input v-model="val.ruleValue"/>-->
          <!--</div>-->
          <!--</el-row>-->
          <br/>
          <!--<el-row v-show="!onePrice">-->
          <!--<el-col :span="6">-->
          <!--<el-form-item label="成本价" prop="Name">-->
          <!--<el-input :disabled="true"/>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="6">-->
          <!--<el-form-item label="结算价" prop="Name">-->
          <!--<el-input :disabled="true"/>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="6">-->
          <!--<el-form-item label="进货数量" prop="Name">-->
          <!--<el-input :disabled="true"/>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-row v-show="!onePrice">-->
          <!--<el-col :span="6">-->
          <!--<el-form-item label="获得点石金" prop="Name">-->
          <!--<el-input :disabled="true"/>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="6">-->
          <!--<el-form-item label="划分类型" prop="Name">-->
          <!--<el-select placeholder="请选择" :disabled="true">-->
          <!--<el-option-->
          <!--v-for="item in options"-->
          <!--:key="item.value"-->
          <!--:label="item.label"-->
          <!--:value="item.value">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="6">-->
          <!--<el-form-item label="现金" prop="Name">-->
          <!--<el-input :disabled="true"/>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-row v-show="!onePrice">-->
          <!--<el-col :span="6">-->
          <!--<el-form-item label="点石金" prop="Name">-->
          <!--<el-input :disabled="true"/>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="6">-->
          <!--<el-form-item label="余额" prop="Name">-->
          <!--<el-input :disabled="true"/>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="6">-->
          <!--<el-form-item label="九洲宝" prop="Name">-->
          <!--<el-input :disabled="true"/>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--</el-row>-->
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark">商品详情</div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="详情描述" class="is-required">
                <el-input v-model="description"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="18">
              <el-form-item label="商品详情" class="is-required">
                <el-upload
                  class="upload-demo"
                  action="string"
                  :http-request="uploadDetail"
                  :on-preview="handlePreview"
                  :on-remove="handleRemoveD"
                  :file-list="fileListD"
                  list-type="picture" disabled>
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item>
            <el-button type="info" @click="saveHandler" v-show="pageModel==='EDIT'||pageModel==='ADD'">保存</el-button>
            <el-button type="danger" @click="resetHandler" v-show="pageModel==='EDIT'||pageModel==='ADD'">重置</el-button>
            <el-button type="info" @click="approved" v-show="pageModel==='AUDIT'">审核通过</el-button>
            <el-button type="info" @click="noApproved" v-show="pageModel==='AUDIT'">审核不通过</el-button>
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

  .ruleList li {
    float: left;
    list-style: none;
  }

  .ruleTable {
    width: 100%;
    background-color: #fff;
    text-align: left;
    border-collapse: collapse;
    border-spacing: 0;
  }

  .ruleTable tr th {
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

  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>
<script type="text/babel">

  import { mapActions, mapGetters } from 'vuex'
  import moduleStore from './bll/productStore'

  import store from '../../store'
  //  import assignDeep from 'assign-deep'
  (!store.state.sysProduct) && store.registerModule('sysProduct', moduleStore)

  export default{
    data() {
      return {
        productId: '',
        description: '',
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        ruleList: 0,
        ruleValueList: [],
        ruleTwoList: 0,
        ruleTwoValueList: [],
        ruleDetailList: [],
        yes: true,
        onePrice: false,
        ruleTwoFlag: false,
        loadListFlag: true,
        ruleName: '',
        ruleTwoName: '',
        pageModel: 'ADD',
        productTypeList: [],
        brandList: [],
        detail: {'description': '', 'photos': []},
        photos: [],
        detailPhotos: [],
        skus: [],
        skuSpecs: [],
        specs: [],
        tags: [],
        specsChild: {'key': '', 'value': ''},
        specsChilds: {'key': '', 'values': []},
        specsKey: {'keyId': '', 'keyName': ''},
        specsValue: {'valueId': '', 'valueName': ''},
        specsValues: [],
        skusChild: {'specs': ''},
        options: [{
          value: '0',
          label: '现金/余额/点石金'
        }, {
          value: '1',
          label: '现金+点石金'
        }, {
          value: '6',
          label: '余额+点石金'
        }],
        form: {
          itemNo: '',
          title: '',
          brandId: '',
          categoryId: ''
        },

        rules: {
          itemNo: [
            {required: true, message: '商品编码不能为空', trigger: 'change'}
          ],
          title: [
            {required: true, message: '商品标题不能为空'}
          ],
          brandId: [
            {required: true, message: '请选择品牌'}
          ],
          categoryId: [
            {required: true, message: '请选择分类'}
          ]
        },
        fileList2: [],
        fileListD: []
      }
    },

    mounted() {
      this.initPage();
    },
    computed: {
      ...mapGetters(['getRootProducts'])
    },
    methods: {
      ...mapActions(['saveProduct', 'queryProduct', 'updateProduct', 'queryRootProducts', 'upLoadPicFromWeApp', 'queryProductTypeList', 'queryBrandList', 'saveStock', 'savePrice', 'ruleUpA', 'updateProductStatus', 'ruleDownA']),

      productTypeChangeHandler(productType) {
        console.log(arguments);
        switch (productType) {
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
        this.$refs.form.validate((valid) => {
          if (!this.dynamicTags.length > 0) {
            this.$message.warning('请添加标签');
            return;
          }
          if (!this.photos.length > 0) {
            this.$message.warning('请添加主图');
            return;
          }
          if (!this.ruleValueList.length > 0) {
            this.$message.warning('请添加规格');
            return;
          }
          if (!this.description) {
            this.$message.warning('请填写详情描述');
            return;
          }
          if (!this.detailPhotos.length > 0) {
            this.$message.warning('请添加详情图');
            return;
          }
          let self = this;
          this.detail.description = this.description;
          this.detail.photos = this.detailPhotos;
          if (valid) {
            if (self.pageModel === 'ADD') {
              self.form['detail'] = this.detail;
              self.form['photos'] = this.photos;
              self.form['tags'] = this.dynamicTags;
              self.form['shopId'] = '0';
              self.form['recommendScore'] = '0';
              self.form['vendorId'] = '0';
              for (let i = 0; i < this.ruleValueList.length; i++) {
                if (this.ruleValueList[i].ruleValue !== '') {
                  if (this.ruleTwoValueList.length > 0) {
                    for (let j = 0; j < this.ruleTwoValueList.length; j++) {
                      if (this.ruleTwoValueList[j].ruleValue !== '') {
                        this.specsKey = {'keyId': '', 'keyName': ''};
                        this.specsKey.keyId = 0;
                        this.specsKey.keyName = this.ruleName;
                        this.specsValue = {'valueId': '', 'valueName': ''};
                        this.specsValue.valueId = i;
                        this.specsValue.valueName = this.ruleValueList[i].ruleValue;
                        this.specsChild = {'key': '', 'value': ''};
                        this.specsChild.key = this.specsKey;
                        this.specsChild.value = this.specsValue;
                        this.skuSpecs = [];
                        this.skuSpecs.push(this.specsChild);
                        this.specsKey = {'keyId': '', 'keyName': ''};
                        this.specsKey.keyId = 1;
                        this.specsKey.keyName = this.ruleTwoName;
                        this.specsValue = {'valueId': '', 'valueName': ''};
                        this.specsValue.valueId = j;
                        this.specsValue.valueName = this.ruleTwoValueList[j].ruleValue;
                        this.specsChild = {'key': '', 'value': ''};
                        this.specsChild.key = this.specsKey;
                        this.specsChild.value = this.specsValue;
                        this.skuSpecs.push(this.specsChild);
                        this.skusChild = {'specs': ''};
                        this.skusChild.specs = this.skuSpecs;
                        this.skus.push(this.skusChild);
                      }
                    }
                  } else {
                    this.specsKey = {'keyId': '', 'keyName': ''};
                    this.specsKey.keyId = 0;
                    this.specsKey.keyName = this.ruleName;
                    this.specsValue = {'valueId': '', 'valueName': ''};
                    this.specsValue.valueId = i;
                    this.specsValue.valueName = this.ruleValueList[i].ruleValue;
                    this.specsChild = {'key': '', 'value': ''};
                    this.specsChild.key = this.specsKey;
                    this.specsChild.value = this.specsValue;
                    this.skuSpecs = [];
                    this.skuSpecs.push(this.specsChild);
                    this.skusChild = {'specs': ''};
                    this.skusChild.specs = this.skuSpecs;
                    this.skus.push(this.skusChild);
                  }
                }
              }
              if (this.skus.length === 0) {
                for (let i = 0; i < this.ruleValueList.length; i++) {
                  if (this.ruleValueList[i].ruleValue !== '') {
                    this.specsKey = {'keyId': '', 'keyName': ''};
                    this.specsKey.keyId = 0;
                    this.specsKey.keyName = this.ruleName;
                    this.specsValue = {'valueId': '', 'valueName': ''};
                    this.specsValue.valueId = i;
                    this.specsValue.valueName = this.ruleValueList[i].ruleValue;
                    this.specsChild = {'key': '', 'value': ''};
                    this.specsChild.key = this.specsKey;
                    this.specsChild.value = this.specsValue;
                    this.skuSpecs = [];
                    this.skuSpecs.push(this.specsChild);
                    this.skusChild = {'specs': ''};
                    this.skusChild.specs = this.skuSpecs;
                    this.skus.push(this.skusChild);
                  }
                }
              }
              self.form['skus'] = this.skus;
              for (let i = 0; i < this.ruleValueList.length; i++) {
                if (this.ruleValueList[i].ruleValue !== '') {
                  this.specsValue = {'valueId': '', 'valueName': ''};
                  this.specsValue.valueId = i;
                  this.specsValue.valueName = this.ruleValueList[i].ruleValue;
                  this.specsValues.push(this.specsValue);
                }
              }


              if (this.specsValues.length > 0) {
                this.specsKey = {'keyId': '', 'keyName': ''};
                this.specsKey.keyId = 0;
                this.specsKey.keyName = this.ruleName;
                this.specsChilds = {'key': '', 'values': ''};
                this.specsChilds.key = this.specsKey;
                this.specsChilds.values = this.specsValues;
                this.specs.push(this.specsChilds);
              }
              this.specsValues = [];
              for (let j = 0; j < this.ruleTwoValueList.length; j++) {
                if (this.ruleTwoValueList[j].ruleValue !== '') {
                  this.specsValue = {'valueId': '', 'valueName': ''};
                  this.specsValue.valueId = j;
                  this.specsValue.valueName = this.ruleTwoValueList[j].ruleValue;
                  this.specsValues.push(this.specsValue);
                }
              }
              if (this.specsValues.length > 0) {
                this.specsKey = {'keyId': '', 'keyName': ''};
                this.specsKey.keyId = 1;
                this.specsKey.keyName = this.ruleTwoName;
                this.specsChilds = {'key': '', 'values': ''};
                this.specsChilds.key = this.specsKey;
                this.specsChilds.values = this.specsValues;
                this.specs.push(this.specsChilds);
              }
              self.form['specs'] = this.specs;
            } else {
              self.form['detail'] = this.detail;
              self.form['photos'] = this.photos;
              self.form['tags'] = this.dynamicTags;
              self.form['shopId'] = '0';
              self.form['recommendScore'] = '0';
              self.form['vendorId'] = '0';
            }
            //继续添加 或 返回列表
            self[self.pageModel === 'ADD' ? 'saveProduct' : 'updateProduct'](self.form).then(function () {
              if (self.pageModel === 'ADD') {
                self.$confirm('商品添加成功.', '提示', {
                  confirmButtonText: '继续添加',
                  cancelButtonText: '返回列表',
                  type: 'info'
                }).then(() => {
                  self.resetHandler();
                }).catch(() => {
                  self.$router.push('/product/index');
                });
              } else {
                self.$alert('修改成功', '提示', {
                  confirmButtonText: '确定'
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
        this.description = ''
        this.dynamicTags = []
        this.ruleList = 0
        this.ruleValueList = []
        this.ruleTwoList = 0
        this.ruleTwoValueList = []
        this.ruleDetailList = []
        this.yes = true
        this.onePrice = false
        this.ruleTwoFlag = false
        this.loadListFlag = true
        this.ruleName = ''
        this.ruleTwoName = ''
        this.detail = {'description': '', 'photos': []}
        this.photos = []
        this.detailPhotos = []
        this.skus = []
        this.skuSpecs = []
        this.specs = []
        this.tags = []
        this.specsChild = {'key': '', 'value': ''}
        this.specsChilds = {'key': '', 'values': []}
        this.specsKey = {'keyId': '', 'keyName': ''}
        this.specsValue = {'valueId': '', 'valueName': ''}
        this.specsValues = []
        this.skusChild = {'specs': ''}
        this.fileList2 = []
//        this.imageUrl = ''
        this.getRuleList();
      },

      addRule() {
        if (this.ruleTwoList === 0) {
          if (this.yes) {
            this.ruleList = 1;
            this.yes = false;
            this.ruleValueList = [];
            this.ruleValueList.push({'ruleValue': ''});
            this.onePrice = true;
          } else {
            this.ruleTwoFlag = true;
            this.ruleTwoList = 1;
            this.ruleTwoValueList = [];
            this.ruleTwoValueList.push({'ruleValue': ''});
            this.getRuleList();
          }
        }
      },

      delRule() {
        if (!this.yes) {
          if (this.ruleTwoList === 0) {
            this.onePrice = false;
            this.ruleList = 0;
            this.yes = true;
            this.ruleName = '';
            this.ruleValueList = [];
          } else {
            this.ruleTwoList = 0;
            this.ruleTwoFlag = false;
            this.ruleTwoName = '';
            this.ruleTwoValueList = [];
          }
        }
      },

      addRuleValue() {
        if (this.ruleValueList.length > 7) {
          this.$message.warning('只能添加8个规格值');
          return;
        }
        this.ruleValueList.push({'ruleValue': ''});
      },

      delRuleValue(key) {
        if (this.ruleValueList) {
          this.ruleValueList.splice(key, 1);
          this.getRuleList();
        }
      },

      addRuleTwoValue() {
        if (this.ruleTwoValueList.length > 7) {
          this.$message.warning('只能添加8个规格值');
          return;
        }
        this.ruleTwoValueList.push({'ruleValue': ''});
      },

      delRuleTwoValue(key) {
        if (this.ruleTwoValueList) {
          this.ruleTwoValueList.splice(key, 1);
          this.getRuleList();
        }
      },

      initPage() {
        this.queryProductTypeList().then(productTypes => {
          this.productTypeList = productTypes
        });
        this.queryBrandList().then(brands => {
          this.brandList = brands
        });
        if (this.$route.query) {
          this.productId = this.$route.query.productId;
          console.log(this.$route.query.type);
          if (this.productId) {
            this.pageModel = this.$route.query.type;
            let id = this.productId;
            this.queryProduct({id}).then(product => {
              console.log(product);
              this.form = product; //TODO 不是很优雅
              this.dynamicTags = product.tags;
              for (let i = 0; i < product.detail.photos.length; i++) {
                this.detailPhotos.push(product.detail.photos[i]);
                this.fileListD.push({name: '图' + (i + 1), url: product.detail.photos[i]});
//                this.imageUrl = product.detail.photos[0];
              }
              if (product.photos.length > 0) {
                for (let i = 0; i < product.photos.length; i++) {
                  this.fileList2.push({name: '图' + (i + 1), url: product.photos[i]});
                  this.photos.push(product.photos[i]);
                }
              }
              if (product.specs.length > 1) {
                this.ruleTwoFlag = true;
                this.onePrice = true;
                this.ruleName = product.specs[0].key.keyName;
                this.ruleTwoName = product.specs[1].key.keyName;
                this.ruleList = 1;
                this.ruleTwoList = 1;
                for (let i = 0; i < product.specs[0].values.length; i++) {
                  this.ruleValueList.push({'ruleValue': product.specs[0].values[i].valueName});
                }
                for (let i = 0; i < product.specs[1].values.length; i++) {
                  this.ruleTwoValueList.push({'ruleValue': product.specs[1].values[i].valueName});
                }
              } else if (product.specs.length > 0) {
                this.onePrice = true;
                this.ruleName = product.specs[0].key.keyName;
                this.ruleList = 1;
                for (let i = 0; i < product.specs[0].values.length; i++) {
                  this.ruleValueList.push({'ruleValue': product.specs[0].values[i].valueName});
                }
              }
              this.ruleDetailList = [];
              for (let i = 0; i < product.skus.length; i++) {
                this.loadListFlag = false;
                if (product.specs.length > 1) {
                  this.ruleDetailList.push({
                    'costPrice': product.skus[i].costPrice / 100,
                    'backDiamond': product.skus[i].diamond / 100,
                    'id': product.skus[i].id,
                    'itemId': product.skus[i].itemId,
                    'originPrice': product.skus[i].originPrice / 100,
                    'sellPrice': product.skus[i].sellPrice / 100,
                    'settlePrice': product.skus[i].settlePrice / 100,
                    'status': product.skus[i].status,
                    'stock': product.skus[i].stock,
                    'cash': product.skus[i].hasOwnProperty('sellPriceRule') ? product.skus[i].sellPriceRule.cash / 100 : '',
                    'diamond': product.skus[i].hasOwnProperty('sellPriceRule') ? product.skus[i].sellPriceRule.diamond / 100 : '',
                    'remainder': product.skus[i].hasOwnProperty('sellPriceRule') ? product.skus[i].sellPriceRule.remainder / 100 : '',
                    'treasure': product.skus[i].hasOwnProperty('sellPriceRule') ? product.skus[i].sellPriceRule.treasure / 100 : '',
                    'type': product.skus[i].hasOwnProperty('sellPriceRule') ? product.skus[i].sellPriceRule.type.toString() : '',
                    'ruleOne': product.skus[i].specs[0].value.valueName,
                    'ruleTwo': product.skus[i].specs[1].value.valueName
                  });
                } else {
                  this.ruleDetailList.push({
                    'costPrice': product.skus[i].costPrice / 100,
                    'backDiamond': product.skus[i].diamond / 100,
                    'id': product.skus[i].id,
                    'itemId': product.skus[i].itemId,
                    'originPrice': product.skus[i].originPrice / 100,
                    'sellPrice': product.skus[i].sellPrice / 100,
                    'settlePrice': product.skus[i].settlePrice / 100,
                    'status': product.skus[i].status,
                    'stock': product.skus[i].stock,
                    'cash': product.skus[i].hasOwnProperty('sellPriceRule') ? product.skus[i].sellPriceRule.cash / 100 : '',
                    'diamond': product.skus[i].hasOwnProperty('sellPriceRule') ? product.skus[i].sellPriceRule.diamond / 100 : '',
                    'remainder': product.skus[i].hasOwnProperty('sellPriceRule') ? product.skus[i].sellPriceRule.remainder / 100 : '',
                    'treasure': product.skus[i].hasOwnProperty('sellPriceRule') ? product.skus[i].sellPriceRule.treasure / 100 : '',
                    'type': product.skus[i].hasOwnProperty('sellPriceRule') ? product.skus[i].sellPriceRule.type.toString() : '',
                    'ruleOne': product.skus[i].specs[0].value.valueName,
                    'ruleTwo': ''
                  });
                }
              }
              this.description = product.detail.description;
            });
          }
        }
      },
      handleRemove(file, fileList) {
        let image = {name: file.name, url: file.url};
        this.fileList2.splice(this.fileList2.indexOf(image), 1);
        this.photos.splice(this.fileList2.indexOf(file.url), 1);
      },
      handleRemoveD(file, fileList) {
        let image = {name: file.name, url: file.url};
        this.fileListD.splice(this.fileListD.indexOf(image), 1);
        this.detailPhotos.splice(this.fileListD.indexOf(file.url), 1);
      },
      handlePreview(file) {
        console.log(file);
      },
      uploadMain (item) {
        console.log('myUpload...');
        let formData = new FormData()
        formData.append('multipartFile', item.file)
        console.log('上传图片接口-参数', item.file)
        this.upLoadPicFromWeApp(formData).then(data => {
          this.photos.push(moduleStore.state.productUploadUrl);
          this.fileList2.push({name: '', url: moduleStore.state.productUploadUrl});
        }).catch(err => {
          this.$message.error('上传失败，请重新上传')
          console.log('报错', err)
        })
      },
      uploadDetail (item) {
        console.log('myUpload...');
        let formData = new FormData()
        formData.append('multipartFile', item.file)
        console.log('上传图片接口-参数', item.file)
        this.upLoadPicFromWeApp(formData).then(data => {
          this.detailPhotos.push(moduleStore.state.productUploadUrl);
          this.fileListD.push({name: '', url: moduleStore.state.productUploadUrl});
        }).catch(err => {
          this.$message.error('上传失败，请重新上传')
          console.log('报错', err)
        })
      },

      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          this.dynamicTags.push(inputValue);
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      getRuleList() {
        if (this.loadListFlag) {
          this.ruleDetailList = [];
          for (let i = 0; i < this.ruleValueList.length; i++) {
            if (this.ruleValueList[i].ruleValue !== '') {
              if (this.ruleTwoValueList.length > 0) {
                for (let j = 0; j < this.ruleTwoValueList.length; j++) {
                  if (this.ruleTwoValueList[j].ruleValue !== '') {
                    this.ruleDetailList.push({
                      'ruleOne': this.ruleValueList[i].ruleValue,
                      'ruleTwo': this.ruleTwoValueList[j].ruleValue
                    })
                  }
                }
              } else {
                this.ruleDetailList.push({
                  'ruleOne': this.ruleValueList[i].ruleValue
                })
              }
            }
          }
          if (this.ruleDetailList.length === 0) {
            for (let i = 0; i < this.ruleValueList.length; i++) {
              if (this.ruleValueList[i].ruleValue !== '') {
                this.ruleDetailList.push({
                  'ruleOne': this.ruleValueList[i].ruleValue
                })
              }
            }
          }
        }
      },

      productStock(rowData) {
        rowData.status = 5;
      },

      saveProductStock(rowData) {
        if (!rowData.costPrice > 0) {
          this.$message.warning('成本价大于0');
          return;
        }
        if (!rowData.settlePrice) {
          this.$message.warning('结算价大于0');
          return;
        }
        if (!rowData.stock) {
          this.$message.warning('库存大于0');
          return;
        }
        let info = {
          'costPrice': rowData.costPrice * 100,
          'itemId': rowData.itemId,
          'quantity': rowData.stock,
          'settlePrice': rowData.settlePrice * 100,
          'skuId': rowData.id,
          'vendorId': 0
        }
        this.saveStock(info).then(data => {
          this.$message.success('进库成功');
          this.speciLoad();
        });
      },

      productPrice(rowData) {
        rowData.status = 6;
      },

      saveProductPrice(rowData) {
        if (!rowData.originPrice) {
          this.$message.warning('原价大于0');
          return;
        }
        if (!rowData.sellPrice) {
          this.$message.warning('销售价大于0');
          return;
        }
        if (!rowData.type) {
          this.$message.warning('请选择划分类型');
          return;
        }
        if (rowData.type === '0') {
          if (!rowData.cash) {
            this.$message.warning('现金大于0');
            return;
          }
          if (!rowData.diamond) {
            this.$message.warning('点石金大于0');
            return;
          }
          if (!rowData.remainder) {
            this.$message.warning('余额大于0');
            return;
          }
        }
        if (rowData.type === '1') {
          if (!rowData.cash) {
            this.$message.warning('现金大于0');
            return;
          }
          if (!rowData.diamond) {
            this.$message.warning('点石金大于0');
            return;
          }
        }
        if (rowData.type === '6') {
          if (!rowData.diamond) {
            this.$message.warning('点石金大于0');
            return;
          }
          if (!rowData.remainder) {
            this.$message.warning('余额大于0');
            return;
          }
        }

        let info = {
          'diamond': rowData.backDiamond * 100,
          'id': rowData.id,
          'sellPrice': rowData.sellPrice * 100,
          'originPrice': rowData.originPrice * 100,
          'sellPriceRule': ''
        };
        let price = {
          'cash': rowData.cash * 100,
          'diamond': rowData.diamond * 100,
          'remainder': rowData.remainder * 100,
          'treasure': rowData.treasure * 100,
          'type': rowData.type
        };
        info.sellPriceRule = price;
        this.savePrice(info).then(data => {
          this.$message.success('售价更新成功');
          this.speciLoad();
        });
      },
      ruleUp(rowData) {
        this.ruleUpA(rowData.id).then(data => {
          this.$message.success('上架成功');
          this.speciLoad();
        });
      },

      ruleDown(rowData) {
        this.ruleDownA(rowData.id).then(data => {
          this.$message.success('下架成功');
          this.speciLoad();
        });
      },

      approved() {
        this.$confirm('确定审核通过?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let product = {itemId: this.form.id, status: 1, id: this.form.id};
          this.updateProductStatus({product}).then(data => {
            this.$confirm('审核通过.', '提示', {
              confirmButtonText: '留在当前页面',
              cancelButtonText: '返回列表',
              type: 'info'
            }).then(() => {
            }).catch(() => {
              this.$router.push('/product/index');
            });
          });
        });
      },

      noApproved() {
        this.$confirm('确定审核不通过?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let product = {itemId: this.form.id, status: -1, id: this.form.id};
          this.updateProductStatus({product}).then(data => {
            this.$confirm('审核不通过.', '提示', {
              confirmButtonText: '留在当前页面',
              cancelButtonText: '返回列表',
              type: 'info'
            }).then(() => {
            }).catch(() => {
              this.$router.push('/product/index');
            });
          });
        });
      },

      speciLoad() {
        let id = this.productId;
        this.queryProduct({id}).then(product => {
          this.ruleDetailList = [];
          for (let i = 0; i < product.skus.length; i++) {
            this.loadListFlag = false;
            if (product.specs.length > 1) {
              this.ruleDetailList.push({
                'costPrice': product.skus[i].costPrice / 100,
                'backDiamond': product.skus[i].diamond / 100,
                'id': product.skus[i].id,
                'itemId': product.skus[i].itemId,
                'originPrice': product.skus[i].originPrice / 100,
                'sellPrice': product.skus[i].sellPrice / 100,
                'settlePrice': product.skus[i].settlePrice / 100,
                'status': product.skus[i].status,
                'stock': product.skus[i].stock,
                'cash': product.skus[i].hasOwnProperty('sellPriceRule') ? product.skus[i].sellPriceRule.cash / 100 : '',
                'diamond': product.skus[i].hasOwnProperty('sellPriceRule') ? product.skus[i].sellPriceRule.diamond / 100 : '',
                'remainder': product.skus[i].hasOwnProperty('sellPriceRule') ? product.skus[i].sellPriceRule.remainder / 100 : '',
                'treasure': product.skus[i].hasOwnProperty('sellPriceRule') ? product.skus[i].sellPriceRule.treasure / 100 : '',
                'type': product.skus[i].hasOwnProperty('sellPriceRule') ? product.skus[i].sellPriceRule.type.toString() : '',
                'ruleOne': product.skus[i].specs[0].value.valueName,
                'ruleTwo': product.skus[i].specs[1].value.valueName
              });
            } else {
              this.ruleDetailList.push({
                'costPrice': product.skus[i].costPrice / 100,
                'backDiamond': product.skus[i].diamond / 100,
                'id': product.skus[i].id,
                'itemId': product.skus[i].itemId,
                'originPrice': product.skus[i].originPrice / 100,
                'sellPrice': product.skus[i].sellPrice / 100,
                'settlePrice': product.skus[i].settlePrice / 100,
                'status': product.skus[i].status,
                'stock': product.skus[i].stock,
                'cash': product.skus[i].hasOwnProperty('sellPriceRule') ? product.skus[i].sellPriceRule.cash / 100 : '',
                'diamond': product.skus[i].hasOwnProperty('sellPriceRule') ? product.skus[i].sellPriceRule.diamond / 100 : '',
                'remainder': product.skus[i].hasOwnProperty('sellPriceRule') ? product.skus[i].sellPriceRule.remainder / 100 : '',
                'treasure': product.skus[i].hasOwnProperty('sellPriceRule') ? product.skus[i].sellPriceRule.treasure / 100 : '',
                'type': product.skus[i].hasOwnProperty('sellPriceRule') ? product.skus[i].sellPriceRule.type.toString() : '',
                'ruleOne': product.skus[i].specs[0].value.valueName,
                'ruleTwo': ''
              });
            }
          }
        });
      },
      checkRuleValue(value) {
        let ruleValue = 0
        for (var i = 0; i < this.ruleValueList.length; i++) {
          if (this.ruleValueList[i].ruleValue === value) {
            ruleValue = ruleValue + 1
            if (ruleValue > 1) {
              this.ruleValueList[i].ruleValue = '';
              this.$message.warning('已添加了相同的规格值');
              return;
            }
          }
        }
        this.getRuleList();
      },
      checkRuleTwoValue(value) {
        let ruleValue = 0
        for (var i = 0; i < this.ruleTwoValueList.length; i++) {
          if (this.ruleTwoValueList[i].ruleValue === value) {
            ruleValue = ruleValue + 1
            if (ruleValue > 1) {
              this.ruleTwoValueList[i].ruleValue = '';
              this.$message.warning('已添加了相同的规格值');
              return;
            }
          }
        }
        this.getRuleList();
      }
    }
//    ,
//    watch: {
//      ruleValueList: {
//        handler(newValue, oldValue) {
//
//          this.getRuleList();
//        },
//        deep: true
//      },
//      ruleTwoValueList: {
//        handler(newValue, oldValue) {
//          this.getRuleList();
//        },
//        deep: true
//      }
//    }
  }
</script>

