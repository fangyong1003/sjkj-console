/**
 * Created by ZHANGXI on 2018/1/17.
 */
import http from '../../../common/httpUtil';
import * as types from './brandMutationTypes';

const actions = {

  queryBrand({ commit }, { id } = {}) {
    //commit(types.PRIV_QUERY_PRIV_BEGIN);

    return http.get(`v1/brand/${id}`).then(brand => {
      //commit(types.PRIV_QUERY_PRIV_SUC, {priv});
      return brand;
    })
  },

  queryBrands ({ commit }, {pageIndex = 1, pageSize = 10, conditions} = {}) {
    conditions['pageNo'] = pageIndex;
    conditions['pageSize'] = pageSize;
    var toStr = JSON.stringify(conditions);
    commit(types.BRAND_QUERY_BRANDS_BEGIN);
    return http.post(`v1/brand/list`, toStr).then(brands => {
      commit(types.BRAND_QUERY_BRANDS_SUC, {brands});
    })
  },

  queryBrandsCount ({ commit }, {conditions}) {
    conditions['pageNo'] = 0;
    conditions['pageSize'] = 0;
    var toStr = JSON.stringify(conditions);
    commit(types.BRAND_QUERY_BRANDS_COUNT_BEGIN);

    return http.post('v1/brand/count', toStr).then(totalCount => {
      commit(types.BRAND_QUERY_BRANDS_COUNT_SUC, {totalCount})
    })
  },

  queryRootBrands({ commit }) {
    //commit(types.PRIV_QUERY_ROOT_PRIVS_BEGIN)

    //return http.get('sys/priv/rootPrivs').then(rootPrivs => {
    //  commit(types.PRIV_QUERY_ROOT_PRIVS_SUC, {rootPrivs})
    //})
  },

  saveBrand({ commit }, brand) {
    console.log(brand);
    return http.postJSON('v1/brand', brand).then(data => {
      commit(types.BRAND_ADD_SUC)
    });
  },

  updateBrand({ commit }, brand) {
    return http.put('v1/brand', brand).then(data => {

    });
  },

  deleteBrand({ commit }, { brandId } = {}) {
    //commit(types.PRIV_DELETE_BEGIN);
    //
    //return http.get(`sys/priv/delete/${brandId}`).then(data => {
    //  commit(types.PRIV_DELETE_SUC, {brandId});
    //});
  },

  upLoadPicFromWeApp({ commit }, formData) {
    return http.postRaw('api/console/upload', formData).then(uploadDate => {
      commit(types.BRAND_UPLOAD_SUC, {uploadDate});
    })
  }
};


export default actions;
