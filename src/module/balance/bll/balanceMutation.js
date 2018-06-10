/**
 * Created by ZHANGXI on 2018/3/27.
 */
import * as types from './balanceMutationTypes';

/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.BALANCE_QUERY_BEGIN](state) {
    state.balances = [];
  },
  [types.BALANCE_QUERY_SUC](state, {balances}) {
    state.balances = balances.body.userBalances;
    state.totalCount = balances.body.totalCount;
  },

  [types.BALANCE_SUC](state) {

  },

  [types.BALANCE_SUMMARY_QUERY_BEGIN](state) {
    state.balanceSummarys = [];
  },

  [types.BALANCE_SUMMARY_QUERY_SUC](state, {balanceSummary}) {
    state.balanceSummarys = balanceSummary.body.result.userBalanceSummaryEntityList;
    state.totalCount = balanceSummary.body.result.totalCount;
  }
};

export default mutations;
