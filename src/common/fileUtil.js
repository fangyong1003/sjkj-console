/**
 * Created by shi.pengyan on 2017-03-30.
 */

const fileUtil = {
  /**
   * 获取文件名后缀
   * @param filename
   * @returns {*}
   */
  getSuffix(filename) {
    if (filename) {
      const lastIndex = filename.lastIndexOf('.');
      return filename.substring(lastIndex + 1);
    }
    return '';
  }
};

module.exports = fileUtil;
