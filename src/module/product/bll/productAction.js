/**
 * Created by ZHANGXI on 2018/1/17.
 */
import http from '../../../common/httpUtil';
import * as types from './productMutationTypes';

const actions = {

  queryProduct({ commit }, { id } = {}) {
    //commit(types.PRIV_QUERY_PRIV_BEGIN);

    return http.get(`v1/item/${id}`).then(product => {
      //commit(types.PRIV_QUERY_PRIV_SUC, {priv});
      return product;
    })
  },

  queryProducts ({ commit }, {pageIndex = 1, pageSize = 10, conditions} = {}) {
    conditions['pageNo'] = pageIndex;
    conditions['pageSize'] = pageSize;
    conditions['loadCategoryAndBrand'] = true;
    var toStr = JSON.stringify(conditions);
    commit(types.PRODUCT_QUERY_PRODUCTS_BEGIN);
    return http.post(`v1/item/list`, toStr).then(products => {
      commit(types.PRODUCT_QUERY_PRODUCTS_SUC, {products});
    })
  },

  queryProductsCount ({ commit }, {conditions}) {
    conditions['pageNo'] = 0;
    conditions['pageSize'] = 0;
    var toStr = JSON.stringify(conditions);
    commit(types.PRODUCT_QUERY_PRODUCTS_COUNT_BEGIN);

    return http.post('v1/item/count', toStr).then(totalCount => {
      commit(types.PRODUCT_QUERY_PRODUCTS_COUNT_SUC, {totalCount})
    })
  },

  queryRootProducts({ commit }) {
    //commit(types.PRIV_QUERY_ROOT_PRIVS_BEGIN)
    //
    //return http.get('sys/priv/rootPrivs').then(rootPrivs => {
    //  commit(types.PRIV_QUERY_ROOT_PRIVS_SUC, {rootPrivs})
    //})
  },

  saveProduct({ commit }, product) {
    return http.postJSON('v1/item', product).then(data => {
      commit(types.PRODUCT_ADD_SUC)
    });
  },

  updateProduct({ commit }, product) {
    return http.putJSON(`v1/item/${product.id}`, product).then(data => {
      commit(types.PRODUCT_UPDATE_SUC)
    })
  },

  deleteProduct({ commit }, { id } = {}) {
    return http.deleteRaw(`v1/item/${id}`).then(data => {
    });
  },
  upLoadPicFromWeApp({ commit }, formData) {
    return http.postRaw('api/console/upload', formData).then(uploadDate => {
      commit(types.PRODUCT_UPLOAD_SUC, {uploadDate});
    })
  },
  queryProductTypeList({ commit }) {
    return http.get(`v1/category`).then(productTypes => {
      return productTypes;
    })
  },

  queryBrandList({ commit }) {
    var jsonData = {};
    jsonData.loadCategoryAndBrand = false;
    jsonData.pageNo = 1;
    jsonData.pageSize = 100;
    var toStr = JSON.stringify(jsonData);
    return http.post(`v1/brand/list`, toStr).then(brands => {
      return brands;
    })
  },

  updateProductStatus({ commit }, { product } = {}) {
    console.log({product});
    let productS = {itemId: product.itemId, status: product.status};
    return http.put(`v1/item/${product.id}/status`, productS).then(data => {

    });
  },

  saveStock({ commit }, info) {
    return http.postJSON(`v1/purchase-order`, info).then(data => {

    });
  },

  savePrice({ commit }, info) {
    return http.postJSON(`v1/sku/sell-info`, info).then(data => {

    });
  },

  ruleUpA({ commit }, id) {
    let status = {
      'id': id,
      'status': 1
    }
    return http.postJSON(`v1/sku/status`, status).then(data => {

    });
  },

  ruleDownA({ commit }, id) {
    let status = {
      'id': id,
      'status': -1
    }
    return http.postJSON(`v1/sku/status`, status).then(data => {

    });
  }

};


export default actions;
