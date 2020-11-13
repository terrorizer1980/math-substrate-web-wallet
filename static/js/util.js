import sha256 from 'crypto-js/sha256'
import md5 from 'md5'
import BigNumber from './bignumber.mjs'

class Util {
  // 时间戳转换日期 （秒）
  timestampToDate(timestamp) {
    var date = new Date(timestamp); //时间戳为10位需*1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  }

  stringToCapitalize(str) {
    var arr = str.toLowerCase().split('_');
    arr = arr.map(function(val) {
      if (val == 'new') {
        val = 'place'
      }
      val = val.slice(0, 1).toUpperCase() + val.slice(1);
      return val
    })
    return arr.join(' ')
  }

  /**
   * cookie操作
   */
  setCookie(name, value, options) {
    options = options || {};
    if (value === null) {
      value = '';
      options.expires = -1;
    }
    var expires = '';
    if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
      var date;
      if (typeof options.expires == 'number') {
        date = new Date();
        date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
      } else {
        date = options.expires;
      }
      expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
    }
    var path = options.path ? '; path=' + options.path : '';
    var domain = options.domain ? '; domain=' + options.domain : '';
    var s = [cookie, expires, path, domain, secure].join('');
    var secure = options.secure ? '; secure' : '';
    var c = [name, '=', encodeURIComponent(value)].join('');
    var cookie = [c, expires, path, domain, secure].join('')
    document.cookie = cookie;
  }

  getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) == (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

  setSession(key, value){
    value = JSON.stringify(value);
    // console.log(value);
    sessionStorage.setItem(key, value);
  }

  getSession(key){
    if (key == "") return "";
    let value = sessionStorage.getItem(key);
    if (value == ""){
      return "";
    }
    return value;
  }

  delSession(key){
    if (key){
      sessionStorage.removeItem(key);
    }
  }

  sessionClear(){
    sessionStorage.clear();
  }

  // 数字千分位，保留n位小数格式化
  addCommas(nStr, n = 2) {
    return new BigNumber(nStr).toFormat(n);
  }

  // 获取加密code和time
  getCodeTime(){
    let key = 'SQscorK9G1ZnlCPo';
    let timestamp = (Date.parse(new Date()))/1000;
    let code = md5(timestamp+sha256(key+timestamp)+timestamp);
    return '&code='+code+'&time='+timestamp;
  }

  //查找 token返回
  findToken(tokens, alias){
    let result = [];
    for (let j=0;j<alias.length;j++){
      for (let i=0; i<tokens.length; i++){
        let item = tokens[i];
        if (item.alias == alias[j]){
          result[item.alias] = item.last2Rmb;
          break;
        }
      }
    }
    return result;
  }

  // 过滤字符串中的空格
  trimString(str){
    return str.replace(/\s*/g, '');
  }

  // 判断终端
  browserVersions() {
    var u = navigator.userAgent.toLowerCase();
    return {
      android: u.indexOf('android') > -1 || u.indexOf('adr') > -1, //android终端
      iPhone: u.indexOf('iphone') > -1, //是否为iPhone或者QQHD浏览器
      Safari: !!u.match(/version\/([\d.]+).*safari/), //是否为Safari浏览器
      weixin: u.indexOf('micromessenger') > -1, //是否微信
      mdsApp: u.indexOf('mdsapp') > -1, //是否MdsApp
      mdsVer: u.indexOf('mdsapp') > -1 ? u.match(/mdsapp\/[^\s]+\s?/)[0].trim().split('/')[1] : '0' //MdsApp版本
    };
  }
}

let util = new Util;

export default util;
