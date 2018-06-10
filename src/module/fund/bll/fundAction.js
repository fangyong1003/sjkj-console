/**
 * Created by ZHANGXI on 2018/3/29.
 */
import http from '../../../common/httpUtil';
import * as types from './fundMutationTypes';

const actions = {
  queryFunds ({ commit }, {pageIndex = 1, pageSize = 10, conditions} = {}) {
    conditions['page'] = pageIndex;
    conditions['size'] = pageSize;
    commit(types.FUND_QUERY_BEGIN);

    return http.postJSONRaw(`api/console/fund/list`, conditions)
      .then(funds => {
        commit(types.FUND_QUERY_SUC, {funds});
      })
  },

  withdraw({ commit }, info) {
    return http.postRaw('api/console/withdraw/pay', info).then(() => {
      commit(types.FUND_SUC)
    });
  },
  queryFlowTypeList({ commit }) {
    return http.get(`api/console/fund/flow_type/list`).then(flowTypes => {
      return flowTypes;
    })
  },
  queryFlowSecondTypeList({ commit }) {
    return http.get(`api/console/fund/change_type/list`).then(flowTypes => {
      return flowTypes;
    })
  }
};


export default actions;
