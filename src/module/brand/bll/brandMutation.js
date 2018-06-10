/**
 * Created by ZHANGXI on 2018/1/17.
 */
import * as types from './brandMutationTypes';
import arrayUtil from '../../../common/arrayUtil';
/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.BRAND_QUERY_ROOT_BRANDS_BEGIN](state) {
    state.rootBrands = [];
  },
  [types.BRAND_QUERY_ROOT_BRANDS_SUC](state, { rootBrands }) {
    state.rootBrands = rootBrands;
  },

  [types.BRAND_QUERY_BRANDS_BEGIN](state) {
    state.brands = [];
  },
  [types.BRAND_QUERY_BRANDS_SUC](state, {brands}) {
    state.brands = brands;
  },

  [types.BRAND_QUERY_BRANDS_COUNT_BEGIN](state) {
    state.totalCount = 0;
  },
  [types.BRAND_QUERY_BRANDS_COUNT_SUC] (state, {totalCount}) {
    state.totalCount = totalCount;
  },

  [types.BRAND_ADD_SUC] (state) {

  },
  [types.BRAND_QUERY_BRAND_BEGIN](state) {

  },
  [types.BRAND_QUERY_BRAND_SUC](state, data) {
    console.log('query user suc', data);

    state.form = data.user;
  },
  [types.BRAND_UPDATE_SUC](state) {

  },

  [types.BRAND_DELETE_BEGIN](state) {
  },

  [types.BRAND_DELETE_SUC](state, {brandId}) {
    arrayUtil.removeItem(state.brands, 'brandId', brandId);
  },

  [types.BRAND_DELETE_FAIL](state) {

  },

  [types.BRAND_UPLOAD_SUC] (state, {uploadDate}) {
    state.brandUploadUrl = uploadDate.body.fileUrl;
  }
};

export default mutations;
