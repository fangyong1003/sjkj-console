/**
 * Created by ZHANGXI on 2018/2/26.
 */
import http from '../../../common/httpUtil';
import * as types from './orderDispatchMutationTypes';

const actions = {
  queryOrderDispatchs ({ commit }, {pageIndex = 1, pageSize = 10, conditions} = {}) {
    conditions['page'] = pageIndex;
    conditions['size'] = pageSize;
    commit(types.ORDER_DISPATCH_QUERY_BEGIN);
    return http.postJSONRaw(`api/console/order/details`, conditions)
      //&startTime=${conditions.startTime}&EndTime=${conditions.EndTime}
      .then(orderDispatchs => {
        commit(types.ORDER_DISPATCH_QUERY_SUC, {orderDispatchs});
      })
  },
  dispatch({ commit }, info) {
    return http.postJSON('api/console/order/dispatch', info).then(() => {
      commit(types.ORDER_DISPATCH_SUC)
    });
  },

  queryExpressList({ commit }) {
    return http.get(`api/console/order/express/list`).then(expresss => {
      return expresss;
    })
  },

  queryOrderDetail({ commit }, { orderId } = {}) {
    return http.get(`api/console/order/order_details?orderId=${orderId}`).then(orderinfo => {
      return orderinfo;
    })
  },

  exportOrderDetail({ commit }, conditions) {
    console.log(conditions);
    return http.getRaw(`api/console/order/export?serialNo=${conditions.serialNo}&orderStatus=${conditions.orderStatus}&paymentStatus=${conditions.paymentStatus}&mobile=${conditions.mobile}&paymentSerial=${conditions.paymentSerial}&startTime=${conditions.startTime}&EndTime=${conditions.EndTime}`, {responseType: 'arraybuffer'}).then(orderinfo => {
      console.log(orderinfo);
      return orderinfo;
    })
  }
};


export default actions;
