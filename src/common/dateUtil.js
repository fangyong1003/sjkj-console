/**
 * Created by shi.pengyan on 2017-01-07.
 */

import fecha from 'fecha';

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format('yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
// (new Date()).Format('yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    'S': this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
  }
  return fmt;
}

/**
 * 日期辅助类
 * @type {{format: (function(*=, *=): *)}}
 */
const dateUtil = {
  /**
   * 格式化日期
   * @param timestamp
   * @param formatter yyyy-MM-dd hh:mm:ss.S
   * @returns {*}
   */
  format(timestamp, formatter) {
    return new Date(timestamp).format(formatter || 'yyyy-MM-dd hh:mm:ss');
  },
  /**
   * 格式化日期时间
   * @param date
   * @param format
   * @returns {*}
   */
  getDateTime(date, format) {
    if (!date) {
      console.warn('date cannot be null');
      return;
    }
    return date.format(format || 'yyyy-MM-dd hh:mm:ss');
  },

  /**
   * 格式化日期时间，使用fecha插件
   * @param dateObj
   * @param format
   * @param pattern
   * @returns {*}
   */
  dateFormat(dateObj, format, pattern) {
    if (Object.prototype.toString.call(dateObj) === '[object Date]') {
      return fecha.format(dateObj, fecha.masks[format] || format);
    } else if (Object.prototype.toString.call(dateObj) === '[object String]') {
      try {
        if (pattern) {
          return fecha.format(this.dateParse(dateObj, pattern), fecha.masks[format] || format);
        } else {
          return fecha.format(dateObj, fecha.masks[format] || format);
        }
      } catch (e) {
        console.warn('Warning, can not format date.');
        return dateObj;
      }
    } else if (Object.prototype.toString.call(dateObj) === '[object Number]') {
      return fecha.format(new Date(dateObj), fecha.masks[format] || format);
    } else {
      console.warn('Warning, can not format date.');
      return dateObj;
    }
  },

  /**
   * 将非日期时间对象转换为日期时间，使用fecha插件
   * @param dateObj
   * @param pattern
   * @returns {*}
   */
  dateParse(dateObj, pattern) {
    if (Object.prototype.toString.call(dateObj) === '[object Date]') {
      return dateObj;
    } else if (Object.prototype.toString.call(dateObj) === '[object String]') {
      try {
        return fecha.parse(dateObj, fecha.masks[pattern] || pattern);
      } catch (e) {
        console.warn('Warning, can not parse date object.');
        return dateObj;
      }
    } else if (Object.prototype.toString.call(dateObj) === '[object Number]') {
      return new Date(dateObj);
    } else {
      console.warn('Warning, can not parse date object.');
      return dateObj;
    }
  }
};

export default dateUtil;
