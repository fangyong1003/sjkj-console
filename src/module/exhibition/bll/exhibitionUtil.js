/**
 * Created by ZHANGXI on 2018/2/3.
 */
const exhibitionUtil = {
  /**
   * 格式化行显示
   * @param data
   * @returns {*}
   */
  formatRow(data) {
    let exhibitionfix = '[Menu]';
    let suffix = '';
    switch (data.type) {
      case 0:
        exhibitionfix = '[Directory]'
        suffix = `[${data.code}]`;
        break;
      case 1:
        exhibitionfix = '[Menu]';
        suffix = `[${data.code}, path:${data.path}, url:${data.url}]`;
        break;
      case 2:
        exhibitionfix = '[Data]';
        suffix = `[${data.code}]`;
        break;
    }

    return `${exhibitionfix} ${data.name} ${suffix}`;
  },

  formatterHandlerType(exhibitionType) {
    let type = 'unkonwn';
    switch (exhibitionType) {
      case 1:
        type = '会场';
        break;
      case 2:
        type = '活动';
        break;
      case 3:
        type = '单品推荐';
        break;
      default:
        type = 'Unkown';
    }
    return type;
  },

  formatterHandlerStatus(exhibitionType) {
    let type = 'unkonwn';
    switch (exhibitionType) {
      case 0:
        type = '未激活';
        break;
      case 1:
        type = '正常';
        break;
      case -1:
        type = '过期';
        break;
      case -2:
        type = '下架';
        break;
      default:
        type = 'Unkown';
    }
    return type;
  },

  formatterHandlerCreditFlag(onlyCreditFlag) {
    let type = 'unkonwn';
    switch (onlyCreditFlag) {
      case '1':
        type = '是';
        break;
      case '-1':
        type = '否';
        break;
      default:
        type = 'Unkown';
    }
    return type;
  }
}

export default exhibitionUtil;
