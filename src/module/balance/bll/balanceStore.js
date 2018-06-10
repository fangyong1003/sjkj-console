/**
 * Created by ZHANGXI on 2018/3/27.
 */
import actions from './balanceAction';
import mutations from './balanceMutation';

const state = {
  totalCount: 0,
  balances: [],
  balanceSummarys: []
};

const getters = {
  getbalances: state => state.balances,
  getbalanceCount: state => state.totalCount
};

export default {
  state,
  getters,
  actions,
  mutations
};
