<template>
  <div>
    <el-form :inline="true" ref="form" :model="form">
      <el-form-item label="会场名称">
        <el-input v-model="form.name" placeholder="会场名称"></el-input>
      </el-form-item>
      <el-form-item label="展会状态">
        <el-select v-model="form.statuses" multiple placeholder="展会状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.type" clearable placeholder="类型">
          <el-option
            v-for="item in typeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="点石金专场">
        <el-select v-model="form.onlyCreditFlag" clearable placeholder="点石金专场">
          <el-option label="是" :value="1"/>
          <el-option label="否" :value="-1"/>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="exhibitionSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="btn-group-wrapper">
      <el-button-group>
        <el-button type="primary" icon="plus" @click="addHandler"/>
        <el-button type="primary" icon="edit" @click="editHandler"/>
        <el-button type="primary" class="el-icon-view" @click="viewHandler"/>
        <el-button type="primary" icon="document" @click="productHandler">会场商品</el-button>
        <el-button type="primary" @click="downExhibitionHandler">下架</el-button>
      </el-button-group>
    </div>

    <el-table :data="exhibitionList" height="500" border :stripe="true" :highlight-current-row="true"
              @current-change="tableRowChangeClickHandler"
              style="width: 100%">
      <!--<el-table-column type="index" width="60"/>-->
      <el-table-column prop="name" label="会场名称" width="200"/>
      <el-table-column prop="type" label="类型" :formatter="formatterHandler" width="150"/>
      <el-table-column prop="status" label="展会状态" :formatter="formatterHandler" width="150"/>
      <el-table-column prop="onlyCreditFlag" label="点石金专场" :formatter="formatterHandler" width="150"/>
      <el-table-column prop="description" label="描述"/>
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
<script type="text/babel">
  import { mapActions } from 'vuex'

  import moduleStore from './bll/exhibitionStore'
  import store from '../../store'
  (!store.state.sysExhibition) && store.registerModule('sysExhibition', moduleStore)
  import exhibitionUtil from './bll/exhibitionUtil';
  export default{
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        currentSelectedRecord: null,
        form: {
          supplierName: '',
          statuses: [],
          type: '',
          onlyCreditFlag: ''
        },
        options: [{
          value: '0',
          label: '未激活'
        }, {
          value: '1',
          label: '正常'
        }, {
          value: '-1',
          label: '过期'
        }, {
          value: '-2',
          label: '下架'
        }],
        typeOptions: [{
          value: '1',
          label: '会场'
        }, {
          value: '2',
          label: '活动'
        }, {
          value: '3',
          label: '单品推荐'
        }]
      }
    },
    computed: {
      exhibitionList() {
        return this.$store.state.sysExhibition.exhibitions;
      },
      totalCount() {
        return this.$store.state.sysExhibition.totalCount;
      }
    },

    mounted() {
      this.initPage();
    },

    methods: {
      ...mapActions(['queryExhibitions', 'queryExhibitionsCount', 'updateExhibitionStatus']),

      initPage() {
        let self = this;
        let conditions = self.form;
        this.queryExhibitions({conditions});
        this.queryExhibitionsCount({conditions});
      },

      addHandler() {
        this.$router.push('/exhibition/add');
      },

      editHandler() {
        if (!this.currentSelectedRecord) {
          this.$message.warning('请选择一条记录');
          return;
        }
        if (this.currentSelectedRecord.status !== 0) {
          this.$message.warning('该会场已过期或在进行，不能修改');
          return;
        }
        this.$router.push({path: '/exhibition/add', query: {id: this.currentSelectedRecord.id, type: 'EDIT'}})
      },

      viewHandler() {
        if (!this.currentSelectedRecord) {
          this.$message.warning('请选择一条记录');
          return;
        }
        this.$router.push({path: '/exhibition/add', query: {id: this.currentSelectedRecord.id, type: 'VIEW'}})
      },

      downExhibitionHandler() {
        if (!this.currentSelectedRecord) {
          this.$message.warning('请选择一条记录');
          return;
        }
        this.$confirm('确定下架?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let id = this.currentSelectedRecord.id;
          this.updateExhibitionStatus(id).then(data => {
            this.$message.success('下架成功');
            this.initPage();
          });
        });
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
        this.queryExhibitions({pageIndex: this.currentPage, pageSize: val, conditions: conditions});
      },
      handleCurrentChange (val) {
        console.log(arguments);
        console.log(`current${val}`);
        this.currentPage = val;
        let self = this;
        let conditions = self.form;
        this.queryExhibitions({pageIndex: val, pageSize: this.pageSize, conditions: conditions});
      },
      formatterHandler (row, column) {
        switch (column.property) {
          case 'status':
            return exhibitionUtil.formatterHandlerStatus(row.status);
          case 'type':
            return exhibitionUtil.formatterHandlerType(row.type);
          case 'onlyCreditFlag':
            return exhibitionUtil.formatterHandlerCreditFlag(row.onlyCreditFlag);
        }
      },
      productHandler() {
        if (!this.currentSelectedRecord) {
          this.$message.warning('请选择一条记录');
          return;
        }
        this.$router.push({
          path: '/exhibition/addP',
          query: {id: this.currentSelectedRecord.id, type: this.currentSelectedRecord.type}
        })
      },
      exhibitionSearch() {
        let self = this;
        let conditions = self.form;
        this.queryExhibitions({conditions});
        this.queryExhibitionsCount({conditions});
      }
    }
  }
</script>

