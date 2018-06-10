<template>
  <div>
    <div class="btn-group-wrapper">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="addHandler"/>
        <el-button type="primary" icon="edit" @click="editHandler"/>
        <!--<el-button type="primary" icon="delete" @click="delHandler"/>-->
      </el-button-group>
    </div>

    <el-table :data="productTypeList" height="500" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler"
              style="width: 100%">
      <!--<el-table-column type="index" width="60"/>-->
      <el-table-column prop="name" label="分类名称" width="200"/>
      <el-table-column prop="showBanner" label="是否显示分类图片" :formatter="formatterHandler" width="150"/>
      <el-table-column prop="score" label="排序" width="100"/>
      <el-table-column label="是否在前端隐藏" width="150">
        <template scope="scope">
          <span v-if="scope.row.hidden == true">是</span>
          <span v-if="scope.row.hidden == false">否</span>
        </template>
      </el-table-column>
      <el-table-column label="logo">
        <template scope="scope">
          <img v-if="scope.row.banner!=''" :src="scope.row.banner" width="45px" height="45px"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style lang="scss">
  .btn-group-wrapper {
    padding-bottom: 4px;
  }
</style>

<script type="text/babel">
  import { mapActions } from 'vuex'

  import moduleStore from './bll/productTypeStore'
  import store from '../../store'
  (!store.state.sysProductType) && store.registerModule('sysProductType', moduleStore)

  //  import productTypeUtil from './bll/productTypeUtil';

  export default{
    data() {
      return {
        //defaultProps: {
        //  children: 'children',
        //  label: 'name'
        //},
        currentPage: 1,
        pageSize: 10,
        currentSelectedRecord: null
      }
    },
    computed: {
      productTypeList() {
        return this.$store.state.sysProductType.productTypes;
      }
    },
    mounted() {
      console.log('[ProductType Page] mounted');
      this.initPage();
    },

    methods: {
      ...mapActions(['queryProductTypes', 'deleteProductType']),

      initPage() {
        this.queryProductTypes();
      },

      addHandler() {
        this.$router.push('/productType/add');
      },

      editHandler() {
        if (!this.currentSelectedRecord) {
          this.$message.warning('请选择一条记录');
          return;
        }
        this.$router.push({path: '/productType/add', query: {id: this.currentSelectedRecord.id}})
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
          this.deleteProductType({productTypeId: this.currentSelectedRecord.productTypeId}).then(data => {
            this.$message.success('Succeed in deleting priv record.');
            this.currentSelectedRecord = null;
          });
        })
      },

      changeStateHandler () {
        this.$message.warning('this function is building...');
      },

      formatterHandler (row, column) {
        switch (column.property) {
          case 'showBanner':
            return row.showBanner === false ? '否' : '是';
        }
      },

      tableRowChangeClickHandler (row, event, column) {
        console.log(row);
        this.currentSelectedRecord = row;
      }

    }
  }
</script>
