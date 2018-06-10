/**
 * Created by shi.pengyan on 2017-01-05.
 */
import actions from './paramAction';
import mutations from './paramMutation';

const state = {
  currentEditRecord: null, //当前编辑的记录
  totalCount: 0,
  params: []
};

const getters = {
  getSysParams: state => state.params,
  getSysParamTotalCount: state => state.totalCount
};

export default {
  state,
  getters,
  actions,
  mutations
};
