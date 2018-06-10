/**
 * Created by shi.pengyan on 2016-12-16.
 */

import http from '../../../common/httpUtil';
import types from './mutationTypes'

const actions = {
  queryUserSessionTimeout ({ commit }) {
    console.log('types', types);
    commit(types.TEST_SESSION_TIMEOUT_BEGIN)

    return http.get('/static/mock/userSessionTimeout.json').then(data => {
      console.log(data);
      commit(types.TEST_SESSION_TIMEOUT_SUC)
    })
  }
};

export default actions;
