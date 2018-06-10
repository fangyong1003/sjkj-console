<template>
  <div>
    <!--<div class="btn-group-wrapper">-->
    <!--<el-button-group>-->
    <!--<el-input  placeholder="批次号"/>-->
    <!--<el-input  placeholder="批次号"/>-->

    <!--&lt;!&ndash;<el-button type="primary" icon="plus" />&ndash;&gt;-->
    <!--&lt;!&ndash;<el-button type="primary" icon="edit" @click="editHandler"/>&ndash;&gt;-->
    <!--&lt;!&ndash;<el-button type="primary" icon="delete" @click="delHandler"/>&ndash;&gt;-->
    <!--</el-button-group>-->
    <!--</div>-->
    <el-row>
      <el-col :span="5">
        <el-input placeholder="批次号" v-model="batchNo"></el-input>
      </el-col>
      <el-col :span="5">
        &nbsp;
        <button type="button" class="el-button el-button--primary el-transfer__button" @click="searchHandler">查询
        </button>
      </el-col>
    </el-row>
    <br/>
    <el-table :data="purchaseList" height="500" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler"
              style="width: 100%">
      <!--<el-table-column type="index" width="60"/>-->
      <el-table-column prop="batchNo" label="批次号" width="260"/>
      <el-table-column prop="costPrice" label="成本价" width="100">
        <template scope="scope">
          {{scope.row.costPrice/100}}
        </template>
      </el-table-column>
      <el-table-column prop="quantity" label="进货数量" width="150"/>
      <el-table-column prop="sellCount" label="销售量统计" width="150"/>
      <el-table-column prop="settleCount" label="已经结算量" width="150"/>
      <el-table-column prop="settlePrice" label="结算价" width="100">
        <template scope="scope">
          {{scope.row.settlePrice/100}}
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

  import moduleStore from './bll/purchaseStore'
  import store from '../../store'
  (!store.state.sysPurchase) && store.registerModule('sysPurchase', moduleStore)

  import purchaseUtil from './bll/purchaseUtil';

  export default{
    data() {
      return {
        batchNo: '',
        currentPage: 1,
        pageSize: 10,
        currentSelectedRecord: null
      }
    },
    computed: {
      purchaseList() {
        return this.$store.state.sysPurchase.purchases;
      },
      totalCount() {
        return this.$store.state.sysPurchase.totalCount;
      }
    },
    mounted() {
      console.log('[Purchase Page] mounted');
      this.initPage();
    },

    methods: {
      ...mapActions(['queryPurchases', 'queryPurchasesCount', 'deletePurchase']),

      initPage() {
        let batchNo = this.batchNo;
        this.queryPurchases({batchNo});
        this.queryPurchasesCount({batchNo});
      },

      addHandler() {
        this.$router.push('/brand/add');
      },

      editHandler() {
        if (!this.currentSelectedRecord) {
          this.$message.warning('Please select one record.');
          return;
        }
        this.$router.push({path: '/brand/add', query: {id: this.currentSelectedRecord.id}})
      },

      delHandler() {
        if (!this.currentSelectedRecord) {
          this.$message.warning('Please select one record.');
          return;
        }
        this.$confirm('Are you sure to delete this record?', 'Confirm', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.deleteBrand({brandId: this.currentSelectedRecord.brandId}).then(data => {
            this.$message.success('Succeed in deleting brand record.');
            this.currentSelectedRecord = null;
          });
        })
      },

      changeStateHandler () {
        this.$message.warning('this function is building...');
      },

      formatterHandler (row, column) {
        switch (column.property) {
          case 'state':
            return row.state === 'A' ? 'Yes' : 'Discard';
          case 'type':
            return purchaseUtil.formatBrandType(row.type);
        }
      },

      tableRowChangeClickHandler (row, event, column) {
        console.log(row);
        this.currentSelectedRecord = row;
      },

      handleSizeChange (val) {
        this.pageSize = val;
        let batchNo = this.batchNo;
        this.queryPurchases({pageIndex: this.currentPage, pageSize: val, batchNo});
      },
      handleCurrentChange (val) {
        this.currentPage = val;
        let batchNo = this.batchNo;
        this.queryPurchases({pageIndex: val, pageSize: this.pageSize, batchNo});
      },
      searchHandler () {
        this.initPage();
      }
    }
  }
</script>
