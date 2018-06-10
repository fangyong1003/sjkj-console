/**
 * Created by ZHANGXI on 2018/2/9.
 */
import http from '../../../common/httpUtil';
import * as types from './exhibitionMutationTypes';

const actions = {

  queryExhibition({ commit }, { id } = {}) {
    //commit(types.USER_QUERY_USER_BEGIN);
    return http.get(`v1/exhibition/${id}`).then(exhibition => {
      //commit(types.USER_QUERY_USER_SUC, {user});
      return exhibition;
    })
  },

  queryExhibitions ({ commit }, {pageIndex = 1, pageSize = 10, conditions} = {}) {
    conditions['pageNo'] = pageIndex;
    conditions['pageSize'] = pageSize;
    var toStr = JSON.stringify(conditions);
    commit(types.EXHIBITION_QUERY_EXHIBITIONS_BEGIN);

    return http.post(`v1/exhibition/list`, toStr).then(exhibitions => {
      commit(types.EXHIBITION_QUERY_EXHIBITIONS_SUC, {exhibitions});
    })
  },

  queryExhibitionsCount ({ commit }, {conditions}) {
    conditions['pageNo'] = 0;
    conditions['pageSize'] = 0;
    var toStr = JSON.stringify(conditions);
    commit(types.EXHIBITION_QUERY_EXHIBITIONS_COUNT_BEGIN);

    return http.post('v1/exhibition/count', toStr).then(totalCount => {
      commit(types.EXHIBITION_QUERY_EXHIBITIONS_COUNT_SUC, {totalCount})
    })
  },
  saveExhibition({ commit }, exhibition) {
    console.log(exhibition);
    return http.postJSON('v1/exhibition', exhibition).then(data => {
      commit(types.EXHIBITION_ADD_SUC)
    });
  },
  updateExhibition({ commit }, exhibition) {
    return http.put('v1/exhibition', exhibition).then(data => {
    });
  },
  upLoadPicMain({ commit }, formData) {
    return http.postRaw('api/console/upload', formData).then(uploadDate => {
      commit(types.EXHIBITION_UPLOAD_MAIN_SUC, {uploadDate});
    })
  },
  upLoadPicNavigate({ commit }, formData) {
    return http.postRaw('api/console/upload', formData).then(uploadDate => {
      commit(types.EXHIBITION_UPLOAD_NAVIGATE_SUC, {uploadDate});
    })
  },
  queryExProducts ({ commit }, {pageIndex = 1, pageSize = 10, titleName} = {}) {
    var jsonData = {};
    jsonData.pageNo = pageIndex;
    jsonData.pageSize = pageSize;
    jsonData.status = 2;
    jsonData.titlePart = titleName;
    var toStr = JSON.stringify(jsonData);
    commit(types.PRODUCT_QUERY_PRODUCTS_BEGIN);

    return http.post(`v1/item/list`, toStr).then(products => {
      commit(types.PRODUCT_QUERY_PRODUCTS_SUC, {products});
    })
  },

  queryExProductsCount ({ commit }, titleName) {
    var jsonData = {};
    jsonData.pageIndex = 0;
    jsonData.pageSize = 0;
    jsonData.status = 2;
    jsonData.titlePart = titleName;
    var toStr = JSON.stringify(jsonData);
    commit(types.PRODUCT_QUERY_PRODUCTS_COUNT_BEGIN);

    return http.post('v1/item/count', toStr).then(productTotalCount => {
      commit(types.PRODUCT_QUERY_PRODUCTS_COUNT_SUC, {productTotalCount})
    })
  },

  addProduct({ commit }, info) {
    return http.postJSON(`v1/exhibition/item/add`, info).then(data => {

    });
  },

  delProduct({ commit }, info) {
    return http.postJSON(`v1/exhibition/item/remove`, info).then(data => {

    });
  },

  queryExhibitionProducts ({ commit }, {pageIndex = 1, pageSize = 10, eId} = {}) {
    var jsonData = {};

    jsonData.exhibitionId = eId.toString();
    jsonData.pageNo = pageIndex;
    jsonData.pageSize = pageSize;
    var toStr = JSON.stringify(jsonData);
    commit(types.PRODUCT_QUERY_EXHIBITION_PRODUCTS_BEGIN);

    return http.post(`v1/item/list`, toStr).then(exhibitionProducts => {
      commit(types.PRODUCT_QUERY_EXHIBITION_PRODUCTS_SUC, {exhibitionProducts});
    })
  },

  queryExhibitionProductTotal ({ commit }, eId) {
    var jsonData = {};
    jsonData.exhibitionId = eId.eId;
    jsonData.pageIndex = 0;
    jsonData.pageSize = 0;
    var toStr = JSON.stringify(jsonData);
    commit(types.PRODUCT_QUERY_EXHIBITION_PRODUCTS_COUNT_BEGIN);

    return http.post('v1/item/count', toStr).then(exhibitionProductTotalCount => {
      commit(types.PRODUCT_QUERY_EXHIBITION_PRODUCTS_COUNT_SUC, {exhibitionProductTotalCount})
    })
  },

  updateExhibitionStatus({ commit }, id) {
    console.log(id);
    var status = -2;
    return http.put(`v1/exhibition/${id}/status/${status}`).then(data => {
    });
  },

  queryExhibitionProduct({ commit }, info) {
    return http.get(`v1/exhibition/${info.exhibtionid}/item/${info.productId}`).then(product => {
      return product;
    })
  },

  saveExhibtionPrice({ commit }, info) {
    return http.postJSON(`v1/exhibition/item/update`, info).then(data => {
    });
  }
};
export default actions;
