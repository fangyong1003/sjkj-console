/**
 * Created by ZHANGXI on 2018/3/27.
 */
import actions from './decreaseAction';
import mutations from './decreaseMutation';

const state = {
  totalCount: 0,
  decreases: []
};

const getters = {
  getWithdraws: state => state.decreases,
  getWithdrawCount: state => state.totalCount
};

export default {
  state,
  getters,
  actions,
  mutations
};
