<template>
  <div>
    <el-dialog ref="dialog" title="商品信息"
               v-model="dialogVisible"
               @close="closeDialogHandler" style="width: 2280px; position: absolute; top: 45%;left: 50%;transform: translate(-50%, -50%); height: 100%">

      <el-form ref="form" :rules="rules" :model="form" label-width="100px" style="width: 1100px">
        <!--<el-row>-->
        <!--<el-col :span="24">-->
        <!--<div class="grid-content bg-purple-dark">价格库存</div>-->
        <!--</el-col>-->
        <!--</el-row>-->
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
                  <td style="width: 80px">
                    <el-button-group>
                      <el-button type="primary" size="small"
                                 v-show="val.status!==undefined&&((val.stock!==0&&val.settlePrice!==0)&&(val.status!==6&&val.status!==5))"
                                 @click="productPrice(val)">售价更新
                      </el-button>
                      <el-button type="primary" size="small" v-show="val.status===6" @click="saveProductPrice(val)">
                        售价保存
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
        <br/>
      </el-form>
    </el-dialog>
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
  import { mapActions } from 'vuex'

  import moduleStore from './bll/exhibitionStore'
  import store from '../../store'
  (!store.state.sysExhibition) && store.registerModule('sysExhibition', moduleStore)

  export default{
    data() {
      return {
        dialogVisible: false,
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
        fileListD: [],
        exhibtionid: ''
      }
    },
    props: {
      closeHandler: {
        type: Function
      }
    },

    methods: {
      ...mapActions(['queryExhibitionProduct', 'saveExhibtionPrice']),

      closeDialogHandler() {
        console.log('close user dialog');
      },

      okHandler() {
        console.log('dialog ok handler');
        this.dialogVisible = false;
      },

      open(id, eid) {
        this.dialogVisible = true;
//        this.productId = id;
        this.exhibtionid = eid;
        let info = {
          'productId': id,
          'exhibtionid': eid
        }
        this.queryExhibitionProduct(info).then(product => {
          console.log(product);
          this.form = product; //TODO 不是很优雅
          this.productId = product.exhibitionItemId;
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
//          this.skuId = product.price.skuId;
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
      },
      close() {
        this.dialogVisible = false;
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
          'id': this.productId,
          'price': {
            'diamond': rowData.diamond * 100,
            'originPrice': rowData.originPrice * 100,
            'sellPrice': rowData.sellPrice * 100,
            'skuId': rowData.id
          },
          'skus': [{
            'diamond': rowData.diamond * 100,
            'exhibitionId': this.exhibtionid,
            'itemId': this.productId,
            'sellPrice': rowData.sellPrice * 100,
            'sellPriceRule': {
              'cash': rowData.cash * 100,
              'diamond': rowData.diamond * 100,
              'remainder': rowData.remainder * 100,
              'treasure': rowData.treasure * 100,
              'type': rowData.type
            },
            'skuId': rowData.id
          }]
        };
        this.saveExhibtionPrice(info).then(data => {
          this.$message.success('售价更新成功');
          rowData.status = 1;
        });
      }
    }
  }
</script>

