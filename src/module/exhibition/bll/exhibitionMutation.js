/**
 * Created by ZHANGXI on 2018/2/3.
 */
import * as types from './exhibitionMutationTypes';
import arrayUtil from '../../../common/arrayUtil';

const mutations = {
  [types.EXHIBITION_QUERY_ROOT_EXHIBITIONS_BEGIN](state) {
    state.rootExhibitions = [];
  },
  [types.EXHIBITION_QUERY_ROOT_EXHIBITIONS_SUC](state, { rootExhibitions }) {
    state.rootExhibitions = rootExhibitions;
  },

  [types.EXHIBITION_QUERY_EXHIBITIONS_BEGIN](state) {
    state.exhibitions = [];
  },
  [types.EXHIBITION_QUERY_EXHIBITIONS_SUC](state, {exhibitions}) {
    state.exhibitions = exhibitions;
  },

  [types.EXHIBITION_QUERY_EXHIBITIONS_COUNT_BEGIN](state) {
    state.totalCount = 0;
  },
  [types.EXHIBITION_QUERY_EXHIBITIONS_COUNT_SUC] (state, {totalCount}) {
    state.totalCount = totalCount;
  },

  [types.EXHIBITION_ADD_SUC] (state) {

  },
  [types.EXHIBITION_QUERY_EXHIBITION_BEGIN](state) {

  },
  [types.EXHIBITION_QUERY_EXHIBITION_SUC](state, data) {
    console.log('query user suc', data);

    state.form = data.exhibition;
  },
  [types.EXHIBITION_UPDATE_SUC](state) {

  },

  [types.EXHIBITION_DELETE_BEGIN](state) {
  },

  [types.EXHIBITION_DELETE_SUC](state, {exhibitionId}) {
    arrayUtil.removeItem(state.exhibitions, 'exhibitionId', exhibitionId);
  },

  [types.EXHIBITION_DELETE_FAIL](state) {

  },

  [types.EXHIBITION_UPLOAD_SUC] (state) {

  },
  [types.PRODUCT_QUERY_PRODUCTS_BEGIN](state) {
    state.products = [];
  },
  [types.PRODUCT_QUERY_PRODUCTS_SUC](state, {products}) {
    state.products = products;
  },

  [types.PRODUCT_QUERY_PRODUCTS_COUNT_BEGIN](state) {
    state.productTotalCount = 0;
  },
  [types.PRODUCT_QUERY_PRODUCTS_COUNT_SUC] (state, {productTotalCount}) {
    state.productTotalCount = productTotalCount;
  },

  [types.PRODUCT_QUERY_EXHIBITION_PRODUCTS_BEGIN](state) {
    state.exhibitionProducts = [];
  },
  [types.PRODUCT_QUERY_EXHIBITION_PRODUCTS_SUC](state, {exhibitionProducts}) {
    state.exhibitionProducts = exhibitionProducts;
  },

  [types.PRODUCT_QUERY_EXHIBITION_PRODUCTS_COUNT_BEGIN](state) {
    state.exhibitionProductTotalCount = 0;
  },
  [types.PRODUCT_QUERY_EXHIBITION_PRODUCTS_COUNT_SUC] (state, {exhibitionProductTotalCount}) {
    state.exhibitionProductTotalCount = exhibitionProductTotalCount;
  },
  [types.EXHIBITION_UPLOAD_MAIN_SUC] (state, {uploadDate}) {
    state.exhibitionMainUploadUrl = uploadDate.body.fileUrl;
  },
  [types.EXHIBITION_UPLOAD_NAVIGATE_SUC] (state, {uploadDate}) {
    state.exhibitionNavigateUploadUrl = uploadDate.body.fileUrl;
  }
};

export default mutations;
