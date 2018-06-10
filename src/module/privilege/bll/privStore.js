/**
 * Created by shi.pengyan on 2017-01-03.
 */

import actions from './privAction';
import mutations from './privMutation';

const state = {
  currentEditRecord: null, //当前编辑的记录
  totalCount: 0,
  privs: [],
  rootPrivs: []
};

const getters = {
  getRootPrivs: state => state.rootPrivs
};

export default {
  state,
  getters,
  actions,
  mutations
};
