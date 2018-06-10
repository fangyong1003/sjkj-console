/**
 * Created by ZHANGXI on 2018/2/12.
 */
import http from '../../../common/httpUtil';
import * as types from './purchaseMutationTypes';

const actions = {

  queryPurchase({ commit }, { id } = {}) {
    //commit(types.PRIV_QUERY_PRIV_BEGIN);

    return http.get(`v1/purchase/${id}`).then(purchase => {
      //commit(types.PRIV_QUERY_PRIV_SUC, {priv});
      return purchase;
    })
  },

  queryPurchases ({ commit }, {pageIndex = 1, pageSize = 10, batchNo} = {}) {
    console.log(batchNo);
    var jsonData = {};
    if (batchNo !== '') {
      jsonData.batchNo = batchNo;
    }
    jsonData.pageNo = pageIndex;
    jsonData.pageSize = pageSize;
    var toStr = JSON.stringify(jsonData);
    commit(types.PURCHASE_QUERY_PURCHASES_BEGIN);
    return http.post(`v1/purchase-order/list`, toStr).then(purchases => {
      commit(types.PURCHASE_QUERY_PURCHASES_SUC, {purchases});
    })
  },

  queryPurchasesCount ({commit}, {batchNo}) {
    var jsonData = {};
    if (batchNo !== '') {
      jsonData.batchNo = batchNo;
    }
    jsonData.pageIndex = 0;
    jsonData.pageSize = 0;
    var toStr = JSON.stringify(jsonData);
    commit(types.PURCHASE_QUERY_PURCHASES_COUNT_BEGIN);

    return http.post('v1/purchase-order/count', toStr).then(totalCount => {
      commit(types.PURCHASE_QUERY_PURCHASES_COUNT_SUC, {totalCount})
    })
  },

  queryRootPurchases({ commit }) {
    //commit(types.PRIV_QUERY_ROOT_PRIVS_BEGIN)

    //return http.get('sys/priv/rootPrivs').then(rootPrivs => {
    //  commit(types.PRIV_QUERY_ROOT_PRIVS_SUC, {rootPrivs})
    //})
  },

  savePurchase({ commit }, purchase) {
    console.log(purchase);
    return http.postJSON('v1/purchase', purchase).then(data => {
      commit(types.PURCHASE_ADD_SUC)
    });
  },

  updatePurchase({ commit }, purchase) {
    return http.put('v1/purchase', purchase).then(data => {

    });
  },

  deletePurchase({ commit }, { purchaseId } = {}) {
    //commit(types.PRIV_DELETE_BEGIN);
    //
    //return http.get(`sys/priv/delete/${brandId}`).then(data => {
    //  commit(types.PRIV_DELETE_SUC, {brandId});
    //});
  },

  upLoadPicFromWeApp({ commit }, formData) {
    return http.postRaw('api/console/upload', formData);
  }
};


export default actions;
