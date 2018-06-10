/**
 * Created by ZHANGXI on 2018/1/17.
 */
import * as types from './supportMutationTypes';
import arrayUtil from '../../../common/arrayUtil';

/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.SUPPORT_QUERY_ROOT_SUPPORTS_BEGIN](state) {
    state.rootSupports = [];
  },
  [types.SUPPORT_QUERY_ROOT_SUPPORTS_SUC](state, { rootSupports }) {
    state.rootSupports = rootSupports;
  },

  [types.SUPPORT_QUERY_SUPPORTS_BEGIN](state) {
    state.supports = [];
  },
  [types.SUPPORT_QUERY_SUPPORTS_SUC](state, {supports}) {
    state.supports = supports.body.suppliers;
    state.totalCount = supports.body.totalCount;
  },

  [types.SUPPORT_QUERY_SUPPORTS_COUNT_BEGIN](state) {
    state.totalCount = 0;
  },
  [types.SUPPORT_QUERY_SUPPORTS_COUNT_SUC] (state, {totalCount}) {
    state.totalCount = totalCount;
  },

  [types.SUPPORT_ADD_SUC] (state) {

  },
  [types.SUPPORT_QUERY_SUPPORT_BEGIN](state) {

  },
  [types.SUPPORT_QUERY_SUPPORT_SUC](state, data) {
    console.log('query user suc', data);

    state.form = data.user;
  },
  [types.SUPPORT_UPDATE_SUC](state) {

  },

  [types.SUPPORT_DELETE_BEGIN](state) {
  },

  [types.SUPPORT_DELETE_SUC](state, {supportId}) {
    arrayUtil.removeItem(state.supports, 'supportId', supportId);
  },

  [types.SUPPORT_DELETE_FAIL](state) {

  },

  [types.SUPPORT_UPLOAD_SUC](state, {uploadDate}) {
    state.supportUploadUrl = uploadDate.body.fileUrl;
  }


};

export default mutations;
