/**
 * Created by ZHANGXI on 2018/1/17.
 */
import http from '../../../common/httpUtil';
import * as types from './supportMutationTypes';

const actions = {

  querySupport({ commit }, { supportId } = {}) {
    return http.get(`api/console/supplier/details?supplierId=${supportId}`).then(support => {
      //commit(types.PRIV_QUERY_PRIV_SUC, {priv});
      return support;
    })
  },

  querySupports ({ commit }, {pageIndex = 1, pageSize = 10, conditions} = {}) {
    commit(types.SUPPORT_QUERY_SUPPORTS_BEGIN);

    return http.getRaw(`api/console/supplier/list?page=${pageIndex}&size=${pageSize}&supplierName=${conditions.supplierName}&mobile=${conditions.mobile}`).then(supports => {
      commit(types.SUPPORT_QUERY_SUPPORTS_SUC, {supports});
    })
  },

  querySupportsCount ({ commit }) {
    //commit(types.PRIV_QUERY_PRIVS_COUNT_BEGIN);
    //
    //return http.get('sys/priv/privsCount').then(totalCount => {
    //  commit(types.PRIV_QUERY_PRIVS_COUNT_SUC, {totalCount})
    //})
  },

  queryRootSupports({ commit }) {
    //commit(types.PRIV_QUERY_ROOT_PRIVS_BEGIN)
    //
    //return http.get('sys/priv/rootPrivs').then(rootPrivs => {
    //  commit(types.PRIV_QUERY_ROOT_PRIVS_SUC, {rootPrivs})
    //})
  },

  saveSupport({ commit }, support) {
    return http.postJSON('api/console/supplier/add', support).then(data => {
      commit(types.SUPPORT_ADD_SUC)
    });
  },

  updateSupport({ commit }, support) {
    return http.postJSON('api/console/supplier/update', support).then(data => {
      commit(types.SUPPORT_UPDATE_SUC)
    });
  },

  deleteSupport({ commit }, { supportId } = {}) {
    //commit(types.PRIV_DELETE_BEGIN);
    //
    //return http.get(`sys/priv/delete/${privId}`).then(data => {
    //  commit(types.PRIV_DELETE_SUC, {privId});
    //});
  },

  upLoadPicSupplier({ commit }, formData) {
    return http.postRaw('api/console/upload', formData).then(uploadDate => {
      commit(types.SUPPORT_UPLOAD_SUC, {uploadDate});
    })
  }
};


export default actions;
