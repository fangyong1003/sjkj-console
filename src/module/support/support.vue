/**
* Created by ZHANGXI on 2018/1/13.
*/
<template>
  <div>
    <el-form :inline="true" ref="form" :model="form">
      <el-form-item label="供应商名">
        <el-input v-model="form.supplierName" placeholder="供应商名"></el-input>
      </el-form-item>
      <el-form-item label="电话">
        <el-input v-model="form.mobile" placeholder="电话"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary"  @click="supportSearch" >查询</el-button>
      </el-form-item>
    </el-form>
    <div class="btn-group-wrapper">
      <el-button-group>
        <!--<el-button type="primary">查询</el-button>-->
        <el-button type="primary" icon="plus" @click="addHandler"/>
        <el-button type="primary" icon="edit" @click="editHandler"/>
      </el-button-group>
    </div>

    <el-table :data="supportList" height="500" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler"
              style="width: 100%">
      <!--<el-table-column type="index" width="60"/>-->
      <el-table-column prop="supplierId" label="供应商号" width="150"/>
      <el-table-column prop="supplierName" label="供应商名" width="150"/>
      <el-table-column prop="enterDate" label="入驻时间" width="200"/>
      <el-table-column prop="statusString" label="状态	" width="100"/>
      <el-table-column prop="logonUserId" label="相关登录用户号" width="150"/>
      <el-table-column prop="mobile" label="登录用户手机	" width="150"/>
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

<style lang="scss">
  .btn-group-wrapper {
    padding-bottom: 4px;
  }
</style>

<script type="text/babel">
  import { mapActions } from 'vuex'

  import moduleStore from './bll/supportStore'
  import store from '../../store'
  (!store.state.sysSupport) && store.registerModule('sysSupport', moduleStore)

  //  import supportUtil from './bll/supportUtil';

  export default{
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        currentSelectedRecord: null,
        form: {
          supplierName: '',
          mobile: ''
        }
      }
    },
    computed: {
      supportList() {
        return this.$store.state.sysSupport.supports;
      },
      totalCount() {
        return this.$store.state.sysSupport.totalCount;
      }
    },
    mounted() {
      console.log('[Support Page] mounted');
      this.initPage();
    },

    methods: {
      ...mapActions(['querySupports', 'querySupportsCount', 'deleteSupport']),

      initPage() {
        let self = this;
        let conditions = self.form;
        this.querySupports({conditions});
      },

      addHandler() {
        this.$router.push('/support/add');
      },

      editHandler() {
        if (!this.currentSelectedRecord) {
          this.$message.warning('请选择一条数据');
          return;
        }
        this.$router.push({path: '/support/add', query: {supportId: this.currentSelectedRecord.supplierId}})
      },

      delHandler() {
        if (!this.currentSelectedRecord) {
          this.$message.warning('请选择一条数据');
          return;
        }
        this.$confirm('Are you sure to delete this record?', 'Confirm', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.deleteSupport({supportId: this.currentSelectedRecord.supportId}).then(data => {
            this.$message.success('Succeed in deleting support record.');
            this.currentSelectedRecord = null;
          });
        })
      },

      changeStateHandler () {
        this.$message.warning('this function is building...');
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
        this.querySupports({pageIndex: this.currentPage, pageSize: val, conditions: conditions});
      },
      handleCurrentChange (val) {
        console.log(arguments);
        console.log(`current${val}`);
        this.currentPage = val;
        let self = this;
        let conditions = self.form;
        this.querySupports({pageIndex: val, pageSize: this.pageSize, conditions: conditions});
      },
      supportSearch() {
        let self = this;
        let conditions = self.form;
        this.querySupports({conditions});
      }
    }
  }
</script>
