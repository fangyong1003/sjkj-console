/**
* Created by ZHANGXI on 2018/1/13.
*/
<template>
  <div>
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">会场商品</div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="5">
        <el-input v-model="title" placeholder="请输入商品标题"></el-input>
      </el-col>
      <el-col :span="2">
        &nbsp;
        <button type="button" class="el-button el-button--primary el-transfer__button" @click="searchHandler">查询
        </button>
      </el-col>
      <el-col :span="1">
        <el-button @click="backList">返回</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="11">
        <el-table :data="productList" height="470" border :stripe="true" :highlight-current-row="true"
                  @current-change="tableRowChangeClickHandler"
                  style="width: 100%">
          <!--<el-table-column type="index" width="60"/>-->
          <el-table-column prop="itemNo" label="商品编码" width="100"/>
          <el-table-column prop="title" label="商品标题"/>
          <!--<el-table-column prop="status" label="状态" :formatter="formatterHandler" width="200"/>-->
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
      </el-col>
      <el-col :span="2"><br/>&nbsp;&nbsp;&nbsp;
        <button type="button" class="el-button el-button--primary el-transfer__button" @click="right"><span><i
          class="el-icon-arrow-right"></i></span></button>
        <br/><br/>
        &nbsp;&nbsp;&nbsp;
        <button type="button" class="el-button el-button--primary el-transfer__button" @click="left"><span><i
          class="el-icon-arrow-left"></i></span></button>
      </el-col>
      <el-col :span="11">
        <el-table :data="exhibitionProductList" height="470" border :stripe="true" :highlight-current-row="true"
                  @current-change="eTableRowChangeClickHandler"
                  style="width: 100%">
          <!--<el-table-column type="index" width="60"/>-->
          <el-table-column prop="itemNo" label="商品编码" width="100"/>
          <el-table-column prop="title" label="商品标题" width="320"/>
          <el-table-column label="操作" min-width="200">
            <template scope="scope">
              <el-button type="primary" size="small" @click="updatePrice(scope.row)">修改价格
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="block">
          <el-pagination
            @size-change="eHandleSizeChange"
            @current-change="eHandleCurrentChange"
            :current-page.sync="eCurrentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="ePageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="exhibitionProductTotalCount">
          </el-pagination>
        </div>
      </el-col>
    </el-row>
    <product-price-edit-dialog ref="productPriceEditDialog"/>
  </div>
</template>

<style lang="css">
  .btn-group-wrapper {
    padding-bottom: 4px;
  }

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
</style>

<script type="text/babel">
  import { mapActions, mapGetters } from 'vuex'

  import moduleStore from './bll/exhibitionStore'
  import store from '../../store'
  import productPriceEditDialog from './productPriceEditDialog.vue'
  (!store.state.sysExhibition) && store.registerModule('sysExhibition', moduleStore)

  //  import exhibitionUtil from './bll/exhibitionUtil';

  export default{
    data() {
      return {
        eCurrentPage: 1,
        ePageSize: 10,
        currentPage: 1,
        pageSize: 10,
        currentSelectedRecord: null,
        eCurrentSelectedRecord: null,
        title: '',
        id: ''
      }
    },
    computed: {
      ...mapGetters(['getRootBrands']),
      productList() {
        return this.$store.state.sysExhibition.products;
      },
      totalCount() {
        return this.$store.state.sysExhibition.productTotalCount;
      },
      exhibitionProductList() {
        return this.$store.state.sysExhibition.exhibitionProducts;
      },
      exhibitionProductTotalCount() {
        return this.$store.state.sysExhibition.exhibitionProductTotalCount;
      }
    },
    components: {productPriceEditDialog},
    mounted() {
      console.log('[Product Page] mounted');
      this.initPage();
    },
    methods: {
      ...mapActions(['queryExProducts', 'queryExProductsCount', 'queryExhibitionProducts', 'queryExhibitionProductTotal', 'addProduct', 'delProduct']),

      initPage() {
        if (this.$route.query) {
          const eId = this.$route.query.id;
          this.id = eId;
          this.queryExProducts();
          this.queryExProductsCount();
          this.queryExhibitionProducts({eId});
          this.queryExhibitionProductTotal({eId});
        }
      },

      right() {
        if (!this.currentSelectedRecord) {
          this.$message.warning('Please select one record.');
          return;
        }
        let info = {exhibitionId: this.$route.query.id, itemIds: [], type: this.$route.query.type};
        info.itemIds.push(this.currentSelectedRecord.id);
        this.addProduct(info).then(data => {
          this.initPage();
        });
      },

      left() {
        if (!this.eCurrentSelectedRecord) {
          this.$message.warning('Please select one record.');
          return;
        }
        let info = {exhibitionId: this.$route.query.id, itemIds: [], type: this.$route.query.type};
        info.itemIds.push(this.eCurrentSelectedRecord.id);
        this.delProduct(info).then(data => {
          this.initPage();
        });
      },

      changeStateHandler () {
        this.$message.warning('this function is building...');
      },

      formatterHandler (row, column) {
        let type = 'unkonwn';
        switch (row.status) {
          case 0:
            type = '待审核';
            break;
          case 1:
            type = '审核通过';
            break;
          case -1:
            type = '审核不通过';
            break;
          case -2:
            type = '下架';
            break;
          case 2:
            type = '上架';
            break;
          default:
            type = 'Unkown';
        }
        return type;
      },

      tableRowChangeClickHandler (row, event, column) {
        console.log(row);
        this.currentSelectedRecord = row;
      },

      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.pageSize = val;
        this.queryExProducts({pageIndex: this.currentPage, pageSize: val});
      },

      handleCurrentChange (val) {
        console.log(arguments);
        console.log(`current${val}`);
        this.currentPage = val;
        this.queryExProducts({pageIndex: val, pageSize: this.pageSize});
      },

      eTableRowChangeClickHandler (row, event, column) {
        console.log(row);
        this.eCurrentSelectedRecord = row;
      },

      eHandleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.ePageSize = val;
        this.queryExhibitionProducts({pageIndex: this.eCurrentPage, pageSize: val, eId: this.id});
      },

      eHandleCurrentChange (val) {
        console.log(arguments);
        console.log(`current${val}`);
        this.ecurrentPage = val;
        this.queryExhibitionProducts({pageIndex: val, pageSize: this.ePageSize, eId: this.id});
      },

      searchHandler () {
        let titleName = this.title;
        this.queryExProducts({titleName});
        this.queryExProductsCount({titleName});
      },

      backList () {
        let self = this;
        self.$router.push('/exhibition/index');
      },

      updatePrice (row) {
        this.$refs.productPriceEditDialog.open(row.id, this.id);
      }
    }
  }
</script>
