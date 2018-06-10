/**
 * Created by ZHANGXI on 2018/3/13.
 */
import http from '../../../common/httpUtil';
import * as types from './withdrawMutationTypes';

const actions = {
  queryWithdraws ({ commit }, {pageIndex = 1, pageSize = 10, conditions} = {}) {
    conditions['page'] = pageIndex;
    conditions['size'] = pageSize;
    commit(types.WITHDRAW_QUERY_BEGIN);

    return http.postJSONRaw(`api/console/withdraw/list`, conditions)
      .then(withdraws => {
        commit(types.WITHDRAW_QUERY_SUC, {withdraws});
      })
  },

  withdraw({ commit }, info) {
    return http.postRaw('api/console/withdraw/pay', info).then(() => {
      commit(types.WITHDRAW_SUC)
    });
  },

  checkFail({ commit }, info) {
    return http.postRaw('api/console/withdraw/status/audit_fail', info).then(() => {
      commit(types.CHECKFAIL_SUC)
    });
  }
};


export default actions;
