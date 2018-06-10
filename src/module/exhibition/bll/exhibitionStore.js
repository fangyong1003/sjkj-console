/**
 * Created by ZHANGXI on 2018/2/9.
 */
/**
 * Created by ZHANGXI on 2018/2/3.
 */
import actions from './exhibitionAction';
import mutations from './exhibitionMutation';

const state = {
  currentEditRecord: null, //当前编辑的记录
  totalCount: 0,
  exhibitions: [],
  products: [],
  productTotalCount: 0,
  rootExhibitions: [],
  fileUrl: [],
  exhibitionProducts: [],
  exhibitionProductTotalCount: 0,
  exhibitionMainUploadUrl: '',
  exhibitionNavigateUploadUrl: ''
};

const getters = {
  getRootExhibitions: state => state.rootExhibitions
};

export default {
  state,
  getters,
  actions,
  mutations
};
