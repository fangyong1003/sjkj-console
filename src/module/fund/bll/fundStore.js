/**
 * Created by ZHANGXI on 2018/3/29.
 */
import actions from './fundAction';
import mutations from './fundMutation';

const state = {
  totalCount: 0,
  funds: []
};

const getters = {
  getfunds: state => state.funds,
  getfundCount: state => state.totalCount
};

export default {
  state,
  getters,
  actions,
  mutations
};
