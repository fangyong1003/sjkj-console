/**
* Created by ZHANGXI on 2018/1/13.
*/
<template>
  <div>
    <div class="btn-group-wrapper">
      <el-form :inline="true" ref="form" :model="form">
        <el-form-item label="商品编码">
          <el-input v-model="form.itemNo" placeholder="商品编码"></el-input>
        </el-form-item>
        <el-form-item label="商品标题">
          <el-input v-model="form.titlePart" placeholder="商品标题"></el-input>
        </el-form-item>
        <el-form-item label="品牌">
          <el-select v-model="form.brandIds" multiple placeholder="品牌">
            <el-option
              v-for="item in brandList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="form.categoryId" clearable placeholder="分类">
            <el-option
              v-for="item in productTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品状态">
          <el-select v-model="form.status" clearable placeholder="商品状态">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="productSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button-group>
        <el-button type="primary" icon="plus" @click="addHandler"/>
        <el-button type="primary" icon="delete" @click="delHandler"/>
        <el-button type="primary" icon="edit" @click="editHandler"/>
      </el-button-group>
      <el-button-group>
        <el-button type="primary" @click="auditHandler">商品审核</el-button>
        <el-button type="primary" @click="speciHandler">规格处理</el-button>
      </el-button-group>
    </div>

    <el-table :data="productList" height="500" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler"
              style="width: 100%">
      <!--<el-table-column type="index" width="60"/>-->
      <el-table-column prop="itemNo" label="商品编码" width="200"/>
      <el-table-column prop="title" label="商品标题" width="350"/>
      <el-table-column prop="title" label="品牌" width="100">
        <template scope="scope">
          {{scope.row.brand.name}}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="分类" width="100">
        <template scope="scope">
          {{scope.row.category.name}}
        </template>
      </el-table-column>
      <el-table-column prop="vendorId" label="供应商" width="100"/>
      <el-table-column prop="status" label="状态" :formatter="formatterHandler" width="100"/>
      <el-table-column label="操作" min-width="100">
        <template scope="scope">
          <el-button type="primary" size="small" @click="updateStatusUp(scope.row)"
                     v-if="scope.row.status===1||scope.row.status===-2">上架
          </el-button>
          <el-button type="danger" size="small" v-if="scope.row.status===2"
                     @click="updateStatusDown(scope.row)"
          >下架
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

  </div>
</template>

<style lang="css">
  .btn-group-wrapper {
    padding-bottom: 4px;
  }
</style>

<script type="text/babel">
  import { mapActions } from 'vuex'

  import moduleStore from './bll/productStore'
  import store from '../../store'
  (!store.state.sysProduct) && store.registerModule('sysProduct', moduleStore)

  import productUtil from './bll/productUtil';

  export default{
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        currentSelectedRecord: null,
        form: {
          categoryId: '',
          status: '',
          brandIds: []
        },
        options: [{
          value: '0',
          label: '待审核'
        }, {
          value: '1',
          label: '审核通过'
        }, {
          value: '-1',
          label: '审核不通过'
        }, {
          value: '-2',
          label: '下架'
        }, {
          value: '2',
          label: '上架'
        }],
        productTypeList: [],
        brandList: []
      }
    },
    computed: {
      productList() {
        return this.$store.state.sysProduct.products;
      },
      totalCount() {
        return this.$store.state.sysProduct.totalCount;
      }
    },
    mounted() {
      console.log('[Product Page] mounted');
      this.initPage();
    },

    methods: {
      ...mapActions(['queryProducts', 'queryProductsCount', 'deleteProduct', 'updateProductStatus', 'queryProductTypeList', 'queryBrandList']),

      initPage() {
        this.queryProductTypeList().then(productTypes => {
          this.productTypeList = productTypes
        });
        this.queryBrandList().then(brands => {
          this.brandList = brands
        });
        let self = this;
        let conditions = self.form;
        this.queryProducts({conditions});
        this.queryProductsCount({conditions});
      },

      addHandler() {
        this.$router.push('/product/add');
      },

      delHandler() {
        if (!this.currentSelectedRecord) {
          this.$message.warning('请选择一条记录');
          return;
        }
        this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let id = this.currentSelectedRecord.id;
          this.deleteProduct({id}).then(data => {
            this.$message.success('删除成功');
            this.initPage();
          });
        });
      },

      editHandler() {
        if (!this.currentSelectedRecord) {
          this.$message.warning('请选择一条记录');
          return;
        }
        this.$router.push({path: '/product/addE', query: {productId: this.currentSelectedRecord.id, type: 'EDIT'}})
      },

      auditHandler() {
        if (!this.currentSelectedRecord) {
          this.$message.warning('请选择一条记录');
          return;
        }
        if (this.currentSelectedRecord.status !== 0) {
          this.$message.warning('商品已审核');
          return;
        }
        this.$router.push({path: '/product/add', query: {productId: this.currentSelectedRecord.id, type: 'AUDIT'}})
      },

      speciHandler() {
        if (!this.currentSelectedRecord) {
          this.$message.warning('请选择一条记录');
          return;
        }
        this.$router.push({
          path: '/product/add',
          query: {productId: this.currentSelectedRecord.id, type: 'SPECI'}
        })
      },

      changeStateHandler () {
        this.$message.warning('this function is building...');
      },

      formatterHandler (row, column) {
        switch (column.property) {
          case 'status':
            return productUtil.formatProductType(row.status);
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
        this.queryProducts({pageIndex: this.currentPage, pageSize: val, conditions: conditions});
      },
      handleCurrentChange (val) {
        console.log(arguments);
        console.log(`current${val}`);
        this.currentPage = val;
        let self = this;
        let conditions = self.form;
        this.queryProducts({pageIndex: val, pageSize: this.pageSize, conditions: conditions});
      },

      updateStatusDown(rowData) {
        this.$confirm('确定下架?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let id = rowData.id;
          let product = {itemId: id, status: -2, id: id};
          console.log(product);
          this.updateProductStatus({product}).then(data => {
            this.$message.success('下架成功');
            this.initPage();
          });
        });
      },

      updateStatusUp(rowData) {
        this.$confirm('确定上架?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let id = rowData.id;
          let product = {itemId: rowData.id, status: 2, id: id};
          this.updateProductStatus({product}).then(data => {
            this.$message.success('上架成功');
            this.initPage();
          });
        });
      },
      productSearch() {
        let self = this;
        let conditions = self.form;
        this.queryProducts({conditions});
        this.queryProductsCount({conditions});
      }
    }
  }
</script>
