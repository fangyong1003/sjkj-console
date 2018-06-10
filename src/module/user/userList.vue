<template>
  <div>
    <div class="btn-group-wrapper">
      <el-form ref="form" :model="form" :inline="true">
        <el-form-item label="手机号" prop="name">
          <el-input v-model="form.userMobile"/>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.userName"/>
        </el-form-item>
        <el-form-item label="父级手机号" prop="name">
          <el-input v-model="form.parentUserMobile"/>
        </el-form-item>
        <el-form-item label="注册起始时间" prop="beginCreateDate">
          <el-date-picker type="datetime"
                          v-model="form.startRegisterDate" style="width:100%"/>
        </el-form-item>
        <el-form-item label="注册结束时间" prop="endCreateDate">
          <el-date-picker type="datetime"
                          v-model="form.endRegisterDate" style="width:100%"/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="initPage">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-table :data="userListList" height="420" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler"
              style="width: 100%">

      <el-table-column prop="userId" label="用户编号" width="100"/>
      <el-table-column prop="userMobile" label="手机号" width="150"/>
      <el-table-column prop="userName" label="姓名" width="100"/>
      <el-table-column prop="membership" label="用户等级" width="100"/>
      <el-table-column label="是否锁定" width="100">
        <template scope="scope">
          {{scope.row.isLock===false?'否':'是'}}
        </template>
      </el-table-column>
      <el-table-column prop="membershipUpgradeDate" label="升级时间" width="200"/>
      <el-table-column prop="userSource" label="用户来源" width="150" :formatter="formatterHandler"/>
      <el-table-column label="父级用户" width="180">
        <template scope="scope">
          {{scope.row.parentUserMobile}}{{scope.row.parentUserName==''?'':'('+scope.row.parentUserName+')'}}
        </template>
      </el-table-column>
      <el-table-column label="爷级用户" width="180">
        <template scope="scope">
          {{scope.row.grandParentUserMobile}}{{scope.row.grandParentUserName==''?'':'('+scope.row.grandParentUserName+')'}}
        </template>
      </el-table-column>
      <el-table-column label="顶级用户" width="180">
        <template scope="scope">
          {{scope.row.rootUserMobile}}{{scope.row.rootUserName==''?'':'('+scope.row.rootUserName+')'}}
        </template>
      </el-table-column>
      <el-table-column prop="registerDate" label="注册时间" width="200"/>
      <el-table-column label="操作" min-width="100" fixed="right">
        <template scope="scope">
          <el-button type="primary" size="small" @click="lock(scope.row)"
                     v-if="scope.row.isLock===false">锁定
          </el-button>
          <el-button type="danger" size="small"
                     @click="unlock(scope.row)" v-if="scope.row.isLock===true"
          >解锁
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
        :total="userListCount">
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

  import moduleStore from './bll/userStore'
  import store from '../../store'
  //  import Vue from 'vue'
  (!store.state.sysUserList) && store.registerModule('sysUserList', moduleStore)


  export default{
    data() {
      return {
        form: {
          startRegisterDate: '',
          endRegisterDate: ''
        },
        currentPage: 1,
        pageSize: 10,
        currentSelectedRecord: null
      }
    },
    computed: {
      userListList() {
        return this.$store.state.sysUserList.userLists;
      },
      userListCount() {
        return this.$store.state.sysUserList.userListCount;
      }
    },
    mounted() {
      console.log('[ProductType Page] mounted');
      this.initPage();
    },

    methods: {
      ...mapActions(['queryUserlists', 'userLock', 'userUnlock']),

      initPage() {
        let self = this;
        let conditions = self.form;
        this.queryUserlists({conditions});
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
        this.queryUserlists({pageIndex: this.currentPage, pageSize: val, conditions: conditions});
      },

      handleCurrentChange (val) {
        console.log(arguments);
        console.log(`current${val}`);
        this.currentPage = val;
        let self = this;
        let conditions = self.form;
        this.queryUserlists({pageIndex: val, pageSize: this.pageSize, conditions: conditions});
      },
      orderSearch() {
        let self = this;
        let conditions = self.form;
        this.queryUserlists({conditions});
      },
      formatterHandler (row, column) {
        switch (row.userSource) {
          case 0:
            return '新平台';
          case 1:
            return '旧平台未签协议';
          case 2:
            return '旧平台已签协议';
        }
      },
      lock(rowData) {
        this.$confirm('确定锁定?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let userId = rowData.userId;
          this.userLock({userId}).then(data => {
            this.$message.success('锁定成功');
            this.initPage();
          });
        });
      },
      unlock(rowData) {
        this.$confirm('确定解锁?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let userId = rowData.userId;
          this.userUnlock({userId}).then(data => {
            this.$message.success('解锁成功');
            this.initPage();
          });
        });
      }
    }
  }
</script>
