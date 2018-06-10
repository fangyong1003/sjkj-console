<!-- Created by shi.pengyan on 2017-01-03. -->
<template>
  <div>
    <div class="btn-group-wrapper">
      <el-form :inline="true" ref="form" :model="form">
        <el-form-item label="品牌名称">
          <el-input v-model="form.name" placeholder="品牌名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="brandSearch">查询</el-button>
        </el-form-item>
      </el-form>
      <el-button-group>
        <el-button type="primary" icon="plus" @click="addHandler"/>
        <el-button type="primary" icon="edit" @click="editHandler"/>
        <!--<el-button type="primary" icon="delete" @click="delHandler"/>-->
      </el-button-group>
    </div>
    <el-table :data="brandList" height="500" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler"
              style="width: 100%">
      <!--<el-table-column type="index" width="60"/>-->
      <el-table-column prop="name" label="品牌名称" width="200"/>
      <el-table-column prop="score" label="排序" width="100"/>
      <el-table-column label="是否在前端隐藏" width="150">
        <template scope="scope">
          <span v-if="scope.row.hidden == true">是</span>
          <span v-if="scope.row.hidden == false">否</span>
        </template>
      </el-table-column>
      <el-table-column label="logo">
        <template scope="scope">
          <img v-if="scope.row.logo!=''" :src="scope.row.logo" width="45px" height="45px"/>
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

  import moduleStore from './bll/brandStore'
  import store from '../../store'
  (!store.state.sysBrand) && store.registerModule('sysBrand', moduleStore)

  import brandUtil from './bll/brandUtil';

  export default{
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        currentSelectedRecord: null,
        form: {
        }
      }
    },
    computed: {
      brandList() {
        return this.$store.state.sysBrand.brands;
      },
      totalCount() {
        return this.$store.state.sysBrand.totalCount;
      }
    },
    mounted() {
      console.log('[Brand Page] mounted');
      this.initPage();
    },

    methods: {
      ...mapActions(['queryBrands', 'queryBrandsCount', 'deleteBrand']),

      initPage() {
        let self = this;
        let conditions = self.form;
        this.queryBrands({conditions});
        this.queryBrandsCount({conditions});
      },

      addHandler() {
        this.$router.push('/brand/add');
      },

      editHandler() {
        if (!this.currentSelectedRecord) {
          this.$message.warning('请选择一条记录');
          return;
        }
        this.$router.push({path: '/brand/add', query: {id: this.currentSelectedRecord.id}})
      },

      delHandler() {
        if (!this.currentSelectedRecord) {
          this.$message.warning('请选择一条记录');
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
            return brandUtil.formatBrandType(row.type);
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
        this.queryBrands({pageIndex: this.currentPage, pageSize: val, conditions: conditions});
      },
      handleCurrentChange (val) {
        console.log(arguments);
        console.log(`current${val}`);
        this.currentPage = val;
        let self = this;
        let conditions = self.form;
        this.queryBrands({pageIndex: val, pageSize: this.pageSize, conditions: conditions});
      },
      brandSearch() {
        let self = this;
        let conditions = self.form;
        this.queryBrands({conditions});
        this.queryBrandsCount({conditions});
      }

      ////TODO old
      //renderTreeRowContent(h, {data, node}) {
      //  console.log('render tree row content', data, node);
      //
      //  return h('span', [brandUtil.formatRow(data)]);
      //  //return (<div>data.name</div>);
      //},
      //
      //handleNodeClick (row, event, column) {
      //  console.log(row);
      //  this.currentSelectedRecord = row;
      //}
    }
  }
</script>
