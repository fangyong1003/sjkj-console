/**
 * Created by ZHANGXI on 2018/1/17.
 */
import actions from './supportAction';
import mutations from './supportMutation';

const state = {
  currentEditRecord: null, //当前编辑的记录
  totalCount: 0,
  supports: [],
  rootSupports: [],
  supportUploadUrl: ''
};

const getters = {
  getRootSupports: state => state.rootSupports
};

export default {
  state,
  getters,
  actions,
  mutations
};
