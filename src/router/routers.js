/**
 * Created by shi.pengyan on 2016-10-30.
 */

// show: meta.label -> name
// name: component name
// meta.label: display label

// lazy loading Components
// https://github.com/vuejs/vue-router/blob/dev/examples/lazy-loading/app.js#L8

// this is for webpack2
const lazyLoading = (path, index = false) => () => System.import(`module/${path}${index ? '/index' : ''}.vue`)

// this is for webpack1
// const lazyLoading = (path, index = false) => resolve => {
//  let fileName = `${basePath}${path}${index ? '/index' : ''}.vue`
//  const nickName = fileName.replace(/\//g, '_')
//
//  require.ensure([], () => resolve(require(fileName)), nickName)
// }


// 路由定义
// 从服务器加载菜单选项

export default [
  {
    name: 'Dashboard',
    path: '/dashboard',
    meta: {icon: 'fa-tachometer'},
    component: lazyLoading('common/dashboard')
  },
  {
    name: 'User',
    path: '/user/index',
    component: lazyLoading('user/user')
  },
  {
    name: 'User Add',
    path: '/user/add',
    component: lazyLoading('user/userAdd')
  },
  {
    name: 'Role',
    path: '/role/index',
    component: lazyLoading('role/role')
  }, {
    name: 'Role Add',
    path: '/role/add',
    component: lazyLoading('role/roleAdd')
  },
  {
    name: 'Priv',
    path: '/priv/index',
    component: lazyLoading('privilege/priv')
  },
  {
    name: 'Priv Add',
    path: '/priv/add',
    component: lazyLoading('privilege/privAdd')
  },
  {
    name: 'Parameter',
    path: '/param/index',
    component: lazyLoading('param/param')
  },
  {
    name: 'Cache',
    path: '/cache/index',
    component: lazyLoading('cache/cache')
  },
  {
    name: 'JobService',
    path: '/jobservice/index',
    component: lazyLoading('jobservice/jobservice')
  },
  {
    name: 'AppMgr',
    path: '/appversion/app',
    component: lazyLoading('appversion/app')
  },
  {
    name: 'App Version',
    path: '/appversion/index',
    component: lazyLoading('appversion/appVersion')
  },
  {
    name: 'Log Audit',
    path: '/logAudit/index',
    component: lazyLoading('logAudit/index')
  },
  {
    name: 'File Upload',
    path: '/fileUpload/index',
    component: lazyLoading('fileUpload/index')
  },
  {
    name: 'Banner',
    path: '/banner/index',
    component: lazyLoading('banner/banner')
  },

  //TODO 项目化时请删除此模块
  {
    name: 'Bulletin',
    path: '/bulletin/index',
    component: lazyLoading('bulletin/bulletin')
  },
  {
    name: 'BulletinForm',
    path: '/bulletin/add',
    component: lazyLoading('bulletin/bulletinForm')
  },
  {
    name: 'Group',
    path: '/group/index',
    component: lazyLoading('group/group')
  },
  {
    name: 'Test',
    path: '/test/index',
    component: lazyLoading('test/index')
  },
  {
    name: 'Test2',
    path: '/test/index2',
    component: lazyLoading('test/index2')
  },
  {
    name: 'Picture',
    path: '/pictureUpload/index',
    component: lazyLoading('pictureUpload/index')
  },
  {
    name: 'BpmnRule',
    path: '/bpmn/rule',
    component: lazyLoading('bpmn/rule')
  },
  {
    name: 'BpmnInstance',
    path: '/bpmn/instance',
    component: lazyLoading('bpmn/instance')
  },
  {
    name: 'BpmnMyTask',
    path: '/bpmn/myTask',
    component: lazyLoading('bpmn/myTask')
  },
  {
    name: 'BpmnMyTaskHis',
    path: '/bpmn/myTaskHis',
    component: lazyLoading('bpmn/myTaskHis')
  },
  {
    name: 'BpmnApply',
    path: '/bpmn/apply',
    component: lazyLoading('bpmn/apply')
  },
  {
    name: 'BpmnWorkflowLeave',
    path: '/bpmn/workflow/leave',
    component: lazyLoading('bpmn/workflow/leave')
  },
  {
    name: 'BpmnWorkFlowLeaveDetail',
    path: '/bpmn/workflow/leaveDetail',
    component: lazyLoading('bpmn/workflow/leaveDetail')
  },
  {
    name: 'BpmnWorkFlowLeaveDetailForDepartmentLeader',
    path: '/bpmn/workflow/leaveDetailForDepartmentLeader',
    component: lazyLoading('bpmn/workflow/leaveDetailForDepartmentLeader')
  },
  {
    name: 'BpmnWorkFlowLeaveDetailForHR',
    path: '/bpmn/workflow/leaveDetailForHR',
    component: lazyLoading('bpmn/workflow/leaveDetailForHR')
  },
  //商品信息
  {
    name: 'product',
    path: '/product/index',
    component: lazyLoading('product/product')
  },
  //添加商品
  {
    name: 'product',
    path: '/product/add',
    component: lazyLoading('product/productAdd')
  },
  //修改商品
  {
    name: 'product',
    path: '/product/addE',
    component: lazyLoading('product/productEdit')
  },
  //供应商
  {
    name: 'support',
    path: '/support/index',
    component: lazyLoading('support/support')
  },
  {
    name: 'support Add',
    path: '/support/add',
    component: lazyLoading('support/supportAdd')
  },
  //商品类目
  {
    name: 'productType',
    path: '/productType/index',
    component: lazyLoading('productType/productType')
  },
  {
    name: 'productType Add',
    path: '/productType/add',
    component: lazyLoading('productType/productTypeAdd')
  },
  //品牌管理
  {
    name: 'brand',
    path: '/brand/index',
    component: lazyLoading('brand/brand')
  },
  {
    name: 'brand Add',
    path: '/brand/add',
    component: lazyLoading('brand/brandAdd')
  },
  //会场
  {
    name: 'exhibition',
    path: '/exhibition/index',
    component: lazyLoading('exhibition/exhibition')
  },
  {
    name: 'exhibition Add',
    path: '/exhibition/add',
    component: lazyLoading('exhibition/exhibitionAdd')
  },
  {
    name: 'exhibition Product',
    path: '/exhibition/addP',
    component: lazyLoading('exhibition/exhibitionProduct')
  },
  //库存
  {
    name: 'purchase',
    path: '/purchase/index',
    component: lazyLoading('purchase/purchase')
  },
  {
    name: 'purchase Add',
    path: '/purchase/add',
    component: lazyLoading('purchase/purchaseAdd')
  },
  //订单
  {
    name: 'orderDispatch',
    path: '/orderDispatch/index',
    component: lazyLoading('orderDispatch/orderDispatch')
  },
  //提现
  {
    name: 'withdraw',
    path: '/withdraw/index',
    component: lazyLoading('withdraw/withdraw')
  },
  //核销
  {
    name: 'decrease',
    path: '/decrease/index',
    component: lazyLoading('decrease/decrease')
  },
  {
    name: 'decrease',
    path: '/decrease/addSubCoin',
    component: lazyLoading('decrease/addSubCoin')
  },
  //用户余额
  {
    name: 'balance',
    path: '/balance/index',
    component: lazyLoading('balance/balance')
  },
  //日余额汇总
  {
    name: 'balanceSummary',
    path: '/balance/balanceSummary',
    component: lazyLoading('balance/balanceSummary')
  },
  //日余额汇总
  {
    name: 'fund',
    path: '/fund/index',
    component: lazyLoading('fund/fund')
  },
  //用户信息
  {
    name: 'userList',
    path: '/user/userList',
    component: lazyLoading('user/userList')
  }
]
