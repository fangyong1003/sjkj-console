/**
 * Created by ZHANGXI on 2018/3/27.
 */
import * as types from './decreaseMutationTypes';

/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.DECREASE_QUERY_BEGIN](state) {
    state.decreases = [];
  },
  [types.DECREASE_QUERY_SUC](state, {decreases}) {
    state.decreases = decreases.body.orderExpressItems;
    state.totalCount = decreases.body.totalCount;
  },

  [types.DECREASE_SUC](state) {

  }
};

export default mutations;
