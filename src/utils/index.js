/*
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-06-10 22:43:59
 * @LastEditors: Linyer
 * @LastEditTime: 2021-08-06 09:54:09
 */
/**
 * 清除字符串中空格
 * params is_global == 'all' 则字符串内的空格都清除掉
 */
export function strTrim(str, isAll) {
  let result = str.replace(/(^\s+)|(\s+$)/g, '');
  if (isAll.toLowerCase() === 'all') {
    result = result.replace(/\s/g, '');
  }
  return result;
}
/**
 * 获取本地存储
 * @param key
 * @param data
 * @param expires
 * @returns {*}
 * @author Dll
 */
export function localStore(key, data, expires) {
  /**
   * 基于本地存储的缓存模块
   *
   * @param {String} key 键名
   * @param {any} data 数据
   * @param {Number} expires 有效期(秒), 0永久
   * @returns {any}
   *
   * 使用例子：
   * localStore('aaa', { a: 1 }); //  永久存储
   * localStore('bbb', { b: 2 }, 3); //  存储3秒
   *
   * setTimeout(function() {
   *     console.log(localStore('aaa'), localStore('bbb')); //  {a: 1} {b: 2}
   * }, 1000);
   *
   * setTimeout(function() {
   *     console.log(localStore('aaa'), localStore('bbb')); //  {a: 1} undefined
   * }, 4000);
   */
  const localStorage = window.localStorage;
  //  不兼容返回空
  if (!localStorage) {
    return undefined;
  }
  const now = +new Date(); //  当前时间戳
  //  有值则存储数据
  if (data !== undefined && data !== '') {
    const storeData = {
      data,
      expires: 0, //  有效期
    };
    if (expires) {
      storeData.expires = now + expires * 1000; //  到期时间戳
    }
    //  无法存入情况
    try {
      return localStorage.setItem(key, JSON.stringify(storeData));
    } catch (er) {
      //  不做处理统一返回
    }
  } else {
    //  获取数据
    try {
      const storeData = JSON.parse(localStorage.getItem(key));
      if (storeData.expires === 0 || now <= storeData.expires) {
        return storeData.data;
      }
      return localStorage.removeItem(key); //  清理过期数据
    } catch (er) {
      //  不做处理统一返回
    }
  }
  return undefined;
}
/**
 * 更改title
 * @param {*}} title
 */
export function changeTitle(title) {
  document.title = title;
  // 如果是 iOS 微信设备，则使用如下 hack 的写法实现页面标题的更新
  if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    const i = document.createElement('iframe');
    i.src = '/favicon.ico';
    i.style.display = 'none';
    i.onload = () => {
      setTimeout(() => {
        i.remove();
      }, 10);
    };
    document.body.appendChild(i);
  }
}
/**
 * 替换指定传入参数的值,paramName为参数,replaceWith为新值
 * @param {*} paramName
 * @param {*} replaceWith
 */
export function replaceParamVal(paramName, replaceWith) {
  const state = { title: '', url: window.location.href };
  window.history.replaceState(state, '', `${window.location.pathname}?${paramName}=${replaceWith}`);
}
/**
 * 获取地址栏参数
 * @param {*} key
 * @returns
 */
export function getQueryString(key) {
  const urlObj = new URL(location.href);
  return urlObj.searchParams.get(key);
}
/**
 * num 小于0，左缩进num*2个空格； 大于0，右缩进num*2个空格。
 * @param {string} str 代码
 * @param {number} num 缩进次数
 * @param {number} len 【可选】缩进单位，空格数
 */
export function indent(str, num, len = 2) {
  if (num === 0) return str;
  const isLeft = num < 0;
  const result = [];
  let reg;
  let spaces = '';
  if (isLeft) {
    num *= -1;
    reg = new RegExp(`(^\\s{0,${num * len}})`, 'g');
  } else {
    for (let i = 0; i < num * len; i++) spaces += ' ';
  }

  str.split('\n').forEach((line) => {
    line = isLeft ? line.replace(reg, '') : spaces + line;
    result.push(line);
  });
  return result.join('\n');
}

// 首字母大小
export function titleCase(str) {
  return str.replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

// 下划转驼峰
export function camelCase(str) {
  return str.replace(/-[a-z]/g, (str1) => str1.substr(-1).toUpperCase());
}
// 是否是数字
export function isNumberStr(str) {
  return /^[+-]?(0|([1-9]\d*))(\.\d+)?$/g.test(str);
}

export const exportDefault = 'export default ';

export const beautifierConf = {
  html: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'separate',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: false,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true,
  },
  js: {
    indent_size: '2',
    indent_char: ' ',
    max_preserve_newlines: '-1',
    preserve_newlines: false,
    keep_array_indentation: false,
    break_chained_methods: false,
    indent_scripts: 'normal',
    brace_style: 'end-expand',
    space_before_conditional: true,
    unescape_strings: false,
    jslint_happy: true,
    end_with_newline: true,
    wrap_line_length: '110',
    indent_inner_html: true,
    comma_first: false,
    e4x: true,
    indent_empty_lines: true,
  },
};

function stringify(obj) {
  return JSON.stringify(obj, (key, val) => {
    if (typeof val === 'function') {
      return `${val}`;
    }
    return val;
  });
}

function parse(str) {
  JSON.parse(str, (k, v) => {
    if (v.indexOf && v.indexOf('function') > -1) {
      return eval(`(${v})`);
    }
    return v;
  });
}

export function jsonClone(obj) {
  return parse(stringify(obj));
}

// 深拷贝对象
export function deepClone(obj) {
  const _toString = Object.prototype.toString;

  // null, undefined, non-object, function
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  // DOM Node
  if (obj.nodeType && 'cloneNode' in obj) {
    return obj.cloneNode(true);
  }

  // Date
  if (_toString.call(obj) === '[object Date]') {
    return new Date(obj.getTime());
  }

  // RegExp
  if (_toString.call(obj) === '[object RegExp]') {
    const flags = [];
    if (obj.global) {
      flags.push('g');
    }
    if (obj.multiline) {
      flags.push('m');
    }
    if (obj.ignoreCase) {
      flags.push('i');
    }

    return new RegExp(obj.source, flags.join(''));
  }

  const result = Array.isArray(obj) ? [] : obj.constructor ? new obj.constructor() : {};

  for (const key in obj) {
    result[key] = deepClone(obj[key]);
  }

  return result;
}

const toStr = Function.prototype.call.bind(Object.prototype.toString);
export function isObjectObject(t) {
  return toStr(t) === '[object Object]';
}
export function isObjectArray(t) {
  return toStr(t) === '[object Array]';
}
export function isObjectNull(t) {
  return toStr(t) === '[object Null]';
}
export function isObjectUnde(t) {
  return toStr(t) === '[object Undefined]';
}
