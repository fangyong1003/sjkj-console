/**
 * Created by ZHANGXI on 2018/3/13.
 */

import actions from './withdrawAction';
import mutations from './withdrawMutation';

const state = {
  totalCount: 0,
  withdraws: []
};

const getters = {
  getWithdraws: state => state.withdraws,
  getWithdrawCount: state => state.totalCount
};

export default {
  state,
  getters,
  actions,
  mutations
};
