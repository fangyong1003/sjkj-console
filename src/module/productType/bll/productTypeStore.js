/**
 * Created by ZHANGXI on 2018/1/17.
 */
import actions from './productTypeAction';
import mutations from './productTypeMutation';

const state = {
  currentEditRecord: null, //当前编辑的记录
  totalCount: 0,
  productTypes: [],
  rootProductTypes: [],
  productTypeUploadUrl: ''
};

const getters = {
  getRootProductType: state => state.rootProductTypes
};

export default {
  state,
  getters,
  actions,
  mutations
};
