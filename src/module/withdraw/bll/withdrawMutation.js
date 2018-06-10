/**
 * Created by ZHANGXI on 2018/3/13.
 */
import * as types from './withdrawMutationTypes';

/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.WITHDRAW_QUERY_BEGIN](state) {
    state.withdraws = [];
  },
  [types.WITHDRAW_QUERY_SUC](state, {withdraws}) {
    state.withdraws = withdraws.body.withdrawDetails;
    state.totalCount = withdraws.body.totalCount;
  },

  [types.WITHDRAW_SUC](state) {

  },

  [types.CHECKFAIL_SUC](state) {

  }

};

export default mutations;
