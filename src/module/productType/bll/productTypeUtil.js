/**
 * Created by ZHANGXI on 2018/1/17.
 */
const productTypeUtil = {
  /**
   * 格式化行显示
   * @param data
   * @returns {*}
   */
  formatRow(data) {
    let prefix = '[Menu]';
    let suffix = '';
    switch (data.type) {
      case 0:
        prefix = '[Directory]'
        suffix = `[${data.code}]`;
        break;
      case 1:
        prefix = '[Menu]';
        suffix = `[${data.code}, path:${data.path}, url:${data.url}]`;
        break;
      case 2:
        prefix = '[Data]';
        suffix = `[${data.code}]`;
        break;
    }

    return `${prefix} ${data.name} ${suffix}`;
  },

  formatProductTypeType(productTypeType) {
    let type = 'unkonwn';
    switch (productTypeType) {
      case 0:
        type = 'Directory';
        break;
      case 1:
        type = 'Menu';
        break;
      case 2:
        type = 'Data';
        break;
      default:
        type = 'Unkown';
    }
    return type;
  }
}

export default productTypeUtil;
