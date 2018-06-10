/**
 * Created by ZHANGXI on 2018/1/16.
 */
import actions from './brandAction';
import mutations from './brandMutation';

const state = {
  currentEditRecord: null, //当前编辑的记录
  totalCount: 0,
  brands: [],
  rootBrands: [],
  fileUrl: [],
  brandUploadUrl: ''
};

const getters = {
  getRootBrands: state => state.rootBrands
};

export default {
  state,
  getters,
  actions,
  mutations
};
