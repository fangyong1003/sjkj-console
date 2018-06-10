/**
 * Created by shi.pengyan on 2016-12-16.
 */

const objUtil = {
  /**
   * 生成{KEY:KEY}
   * @param array
   * @returns {*}
   */
  generateSameKeyValueMap(array) {
    let newArray = [];
    if (array) {
      newArray = array.reduce(function (obj, str) {
        obj[str] = str;
        return obj;
      }, {})
    }
    return newArray;
  }
};

export default objUtil;
