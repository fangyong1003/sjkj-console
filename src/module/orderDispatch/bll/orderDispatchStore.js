/**
 * Created by ZHANGXI on 2018/2/26.
 */

import actions from './orderDispatchAction';
import mutations from './orderDispatchMutation';

const state = {
  totalCount: 0,
  orderDispatchs: []
};

const getters = {
  getOrderDispatchs: state => state.orderDispatchs,
  getOrderDispatchCount: state => state.totalCount
};

export default {
  state,
  getters,
  actions,
  mutations
};
