/**
 * Created by ZHANGXI on 2018/3/27.
 */
import http from '../../../common/httpUtil';
import * as types from './decreaseMutationTypes';

const actions = {
  queryDecreases ({ commit }, {pageIndex = 1, pageSize = 10, conditions} = {}) {
    conditions['page'] = pageIndex;
    conditions['size'] = pageSize;
    commit(types.DECREASE_QUERY_BEGIN);

    return http.postJSONRaw(`api/console/order/details`, conditions)
      .then(decreases => {
        commit(types.DECREASE_QUERY_SUC, {decreases});
      })
  },

  withdraw({ commit }, info) {
    return http.postRaw('api/console/withdraw/pay', info).then(() => {
      commit(types.DECREASE_SUC)
    });
  },

  //核销余额
  decreaseBalance({ commit }, info) {
    return http.postRaw('api/console/asset/decrease/balance', info).then(() => {
      commit(types.DECREASE_SUC)
    });
  },

  decreaseCredit({ commit }, info) {
    return http.postRaw('api/console/asset/decrease/credit', info).then(() => {
      commit(types.DECREASE_SUC)
    });
  },

  decreaseProperty({ commit }, info) {
    return http.postRaw('api/console/asset/decrease/property', info).then(() => {
      commit(types.DECREASE_SUC)
    });
  }
};


export default actions;
