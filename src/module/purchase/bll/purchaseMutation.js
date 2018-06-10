/**
 * Created by ZHANGXI on 2018/2/12.
 */
import * as types from './purchaseMutationTypes';
import arrayUtil from '../../../common/arrayUtil';
/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.PURCHASE_QUERY_ROOT_PURCHASES_BEGIN](state) {
    state.rootPurchases = [];
  },
  [types.PURCHASE_QUERY_ROOT_PURCHASES_SUC](state, { rootPurchases }) {
    state.rootPurchases = rootPurchases;
  },

  [types.PURCHASE_QUERY_PURCHASES_BEGIN](state) {
    state.purchases = [];
  },
  [types.PURCHASE_QUERY_PURCHASES_SUC](state, {purchases}) {
    state.purchases = purchases;
  },

  [types.PURCHASE_QUERY_PURCHASES_COUNT_BEGIN](state) {
    state.totalCount = 0;
  },
  [types.PURCHASE_QUERY_PURCHASES_COUNT_SUC] (state, {totalCount}) {
    state.totalCount = totalCount;
  },

  [types.PURCHASE_ADD_SUC] (state) {

  },
  [types.PURCHASE_QUERY_PURCHASE_BEGIN](state) {

  },
  [types.PURCHASE_QUERY_PURCHASE_SUC](state, data) {
    console.log('query user suc', data);

    state.form = data.user;
  },
  [types.PURCHASE_UPDATE_SUC](state) {

  },

  [types.BRAND_DELETE_BEGIN](state) {
  },

  [types.PURCHASE_DELETE_SUC](state, {purchaseId}) {
    arrayUtil.removeItem(state.purchases, 'purchaseId', purchaseId);
  },

  [types.PURCHASE_DELETE_FAIL](state) {

  },

  [types.PURCHASE_UPLOAD_SUC] (state) {

  }
};

export default mutations;
