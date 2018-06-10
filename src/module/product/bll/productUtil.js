/**
 * Created by ZHANGXI on 2018/1/17.
 */
const productUtil = {
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

  formatProductType(productType) {
    let type = 'unkonwn';
    switch (productType) {
      case 0:
        type = '待审核';
        break;
      case 1:
        type = '审核通过';
        break;
      case -1:
        type = '审核不通过';
        break;
      case -2:
        type = '下架';
        break;
      case 2:
        type = '上架';
        break;
      default:
        type = 'Unkown';
    }
    return type;
  }
}

export default productUtil;
