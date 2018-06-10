/**
 * Created by ZHANGXI on 2018/2/12.
 */
import actions from './purchaseAction';
import mutations from './purchaseMutation';

const state = {
  currentEditRecord: null, //当前编辑的记录
  totalCount: 0,
  purchases: [],
  rootPurchases: [],
  fileUrl: []
};

const getters = {
  getRootPurchases: state => state.rootPurchases
};

export default {
  state,
  getters,
  actions,
  mutations
};
