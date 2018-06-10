/**
 * Created by ZHANGXI on 2018/2/26.
 */
import * as types from './orderDispatchMutationTypes';

/**
 * mutations
 * @type {{}}
 */
const mutations = {
  [types.ORDER_DISPATCH_QUERY_BEGIN](state) {
    state.orderDispatchs = [];
  },
  [types.ORDER_DISPATCH_QUERY_SUC](state, {orderDispatchs}) {
    state.orderDispatchs = orderDispatchs.body.orderExpressItems;
    state.totalCount = orderDispatchs.body.totalCount;
  },

  [types.ORDER_DISPATCH_SUC](state) {

  }
};

export default mutations;
