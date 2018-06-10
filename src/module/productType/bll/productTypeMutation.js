/**
 * Created by ZHANGXI on 2018/1/17.
 */
import * as types from './productTypeMutationTypes';
import arrayUtil from '../../../common/arrayUtil';
/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.PRODUCTTYPE_QUERY_ROOT_PRODUCTTYPES_BEGIN](state) {
    state.rootProductTypes = [];
  },
  [types.PRODUCTTYPE_QUERY_ROOT_PRODUCTTYPES_SUC](state, { rootProductTypes }) {
    state.rootProductTypes = rootProductTypes;
  },

  [types.PRODUCTTYPE_QUERY_PRODUCTTYPES_BEGIN](state) {
    state.productTypes = [];
  },
  [types.PRODUCTTYPE_QUERY_PRODUCTTYPES_SUC](state, {productTypes}) {
    state.productTypes = productTypes;
  },

  [types.PRODUCTTYPE_QUERY_PRODUCTTYPES_COUNT_BEGIN](state) {
    state.totalCount = 0;
  },
  [types.PRODUCTTYPE_QUERY_PRODUCTTYPES_COUNT_SUC] (state, {totalCount}) {
    state.totalCount = totalCount;
  },

  [types.PRODUCTTYPE_ADD_SUC] (state) {

  },
  [types.PRODUCTTYPE_QUERY_PRODUCTTYPE_BEGIN](state) {

  },
  [types.PRODUCTTYPE_QUERY_PRODUCTTYPE_SUC](state, data) {
    console.log('query user suc', data);

    state.form = data.user;
  },
  [types.PRODUCTTYPE_UPDATE_SUC](state) {

  },

  [types.PRODUCTTYPE_DELETE_BEGIN](state) {
  },

  [types.PRODUCTTYPE_DELETE_SUC](state, {productTypeId}) {
    arrayUtil.removeItem(state.productTypes, 'productTypeId', productTypeId);
  },

  [types.PRODUCTTYPE_DELETE_FAIL](state) {

  },

  [types.PRODUCTTYPE_UPLOAD_SUC] (state, {uploadDate}) {
    state.productTypeUploadUrl = uploadDate.body.fileUrl;
  }

};

export default mutations;
