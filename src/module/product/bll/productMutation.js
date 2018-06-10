/**
 * Created by ZHANGXI on 2018/1/17.
 */
import * as types from './productMutationTypes';
import arrayUtil from '../../../common/arrayUtil';
/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.PRODUCT_QUERY_ROOT_PRODUCTS_BEGIN](state) {
    state.rootProducts = [];
  },
  [types.PRODUCT_QUERY_ROOT_PRODUCTS_SUC](state, { rootProducts }) {
    state.rootProducts = rootProducts;
  },

  [types.PRODUCT_QUERY_PRODUCTS_BEGIN](state) {
    state.products = [];
  },
  [types.PRODUCT_QUERY_PRODUCTS_SUC](state, {products}) {
    state.products = products;
  },

  [types.PRODUCT_QUERY_PRODUCTS_COUNT_BEGIN](state) {
    state.totalCount = 0;
  },
  [types.PRODUCT_QUERY_PRODUCTS_COUNT_SUC] (state, {totalCount}) {
    state.totalCount = totalCount;
  },

  [types.PRODUCT_ADD_SUC] (state) {

  },
  [types.PRODUCT_QUERY_PRODUCT_BEGIN](state) {

  },
  [types.PRODUCT_QUERY_PRODUCT_SUC](state, data) {
    console.log('query user suc', data);

    state.form = data.user;
  },
  [types.PRODUCT_UPDATE_SUC](state) {

  },

  [types.PRODUCT_DELETE_BEGIN](state) {
  },

  [types.PRODUCT_DELETE_SUC](state, {productId}) {
    arrayUtil.removeItem(state.products, 'productId', productId);
  },

  [types.PRODUCT_DELETE_FAIL](state) {

  },

  [types.PRODUCT_UPLOAD_SUC](state, {uploadDate}) {
    state.productUploadUrl = uploadDate.body.fileUrl;
  }
};

export default mutations;
