/**
 * Created by ZHANGXI on 2018/3/29.
 */
import * as types from './fundMutationTypes';

/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.FUND_QUERY_BEGIN](state) {
    state.balances = [];
  },
  [types.FUND_QUERY_SUC](state, {funds}) {
    state.funds = funds.body.fundFlowDetails;
    state.totalCount = funds.body.totalCount;
  },

  [types.FUND_SUC](state) {

  }
};

export default mutations;
