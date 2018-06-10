/**
 * Created by ZHANGXI on 2018/1/17.
 */
import actions from './productAction';
import mutations from './productMutation';

const state = {
  currentEditRecord: null, //当前编辑的记录
  totalCount: 0,
  products: [],
  rootProducts: [],
  productUploadUrl: ''
};

const getters = {
  getRootProducts: state => state.rootProducts
};

export default {
  state,
  getters,
  actions,
  mutations
};
