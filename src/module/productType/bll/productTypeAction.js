/**
 * Created by ZHANGXI on 2018/1/17.
 */
import http from '../../../common/httpUtil';
import * as types from './productTypeMutationTypes';

const actions = {

  queryProductType({ commit }, { id } = {}) {
    //commit(types.PRIV_QUERY_PRIV_BEGIN);

    return http.get(`v1/category/${id}`).then(productType => {
      //commit(types.PRIV_QUERY_PRIV_SUC, {priv});
      return productType;
    })
  },

  queryProductTypes ({ commit }) {
    commit(types.PRODUCTTYPE_QUERY_PRODUCTTYPES_BEGIN);

    return http.get(`v1/category`).then(productTypes => {
      commit(types.PRODUCTTYPE_QUERY_PRODUCTTYPES_SUC, {productTypes});
    })
  },

  queryProductTypesCount ({ commit }) {
    //commit(types.PRIV_QUERY_PRIVS_COUNT_BEGIN);
    //
    //return http.get('sys/priv/privsCount').then(totalCount => {
    //  commit(types.PRIV_QUERY_PRIVS_COUNT_SUC, {totalCount})
    //})
  },

  queryRootProductTypes({ commit }) {
    //commit(types.PRIV_QUERY_ROOT_PRIVS_BEGIN)

    //return http.get('sys/priv/rootPrivs').then(rootPrivs => {
    //  commit(types.PRIV_QUERY_ROOT_PRIVS_SUC, {rootPrivs})
    //})
  },

  saveProductType({ commit }, productType) {
    return http.postJSON('v1/category', productType).then(data => {
      commit(types.PRODUCTTYPE_ADD_SUC)
    });
  },

  updateProductType({ commit }, productType) {
    return http.put('v1/category', productType).then(data => {
      commit(types.PRODUCTTYPE_UPDATE_SUC)
    });
  },

  deleteProductType({ commit }, { productTypeId } = {}) {
    //commit(types.PRIV_DELETE_BEGIN);
    //
    //return http.get(`sys/priv/delete/${brandId}`).then(data => {
    //  commit(types.PRIV_DELETE_SUC, {brandId});
    //});
  },
  upLoadPicFromWe({ commit }, formData) {
    return http.postRaw('api/console/upload', formData).then(uploadDate => {
      commit(types.PRODUCTTYPE_UPLOAD_SUC, {uploadDate});
    })
  }
};


export default actions;
