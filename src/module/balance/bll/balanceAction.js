/**
 * Created by ZHANGXI on 2018/3/27.
 */
import http from '../../../common/httpUtil';
import * as types from './balanceMutationTypes';

const actions = {
  queryBalances ({ commit }, {pageIndex = 1, pageSize = 10, conditions} = {}) {
    conditions['page'] = pageIndex;
    conditions['size'] = pageSize;
    commit(types.BALANCE_QUERY_BEGIN);

    return http.postJSONRaw(`api/console/user/balance/list`, conditions)
      .then(balances => {
        commit(types.BALANCE_QUERY_SUC, {balances});
      })
  },

  withdraw({ commit }, info) {
    return http.postRaw('api/console/withdraw/pay', info).then(() => {
      commit(types.BALANCE_SUC)
    });
  },


  exportBalanceExcel({ commit }, conditions) {
    console.log(conditions);
    return http.getRaw(`api/console/user/balance/export?startEffectiveDate=${conditions.startEffectiveDate}&endEffectiveDate=${conditions.endEffectiveDate}&userName=${conditions.userName}&mobile=${conditions.mobile}`, {responseType: 'arraybuffer'}).then(Balance => {
      console.log(Balance);
      return Balance;
    })
  },

  queryBalanceSummarys ({ commit }, {pageIndex = 1, pageSize = 10, conditions} = {}) {
    conditions['page'] = pageIndex;
    conditions['size'] = pageSize;
    commit(types.BALANCE_SUMMARY_QUERY_BEGIN);

    return http.postJSONRaw(`api/console/user/balance/summary`, conditions)
      .then(balanceSummary => {
        commit(types.BALANCE_SUMMARY_QUERY_SUC, {balanceSummary});
      })
  },

  exportBalanceSummaryExcel({ commit }, conditions) {
    console.log(conditions);
    return http.getRaw(`api/console/user/balance/summary_export?startEffDate=${conditions.startEffDate}&endEffDate=${conditions.endEffDate}`, {responseType: 'arraybuffer'}).then(balanceSummary => {
      console.log(balanceSummary);
      return balanceSummary;
    })
  }

};


export default actions;
