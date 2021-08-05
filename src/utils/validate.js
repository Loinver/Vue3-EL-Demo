const check = {
  // 验证邮箱
  isEmail(str) {
    return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
  },
  // 验证手机号码
  isMobile(str) {
    return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
  },
  // 验证电话号码
  isTel(str) {
    return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
  },
  // 验证数字
  isNumber(str) {
    return /^[0-9]$/.test(str);
  },
  // 验证是否是英文
  isEnglish(str) {
    return /^[a-zA-Z]+$/.test(str);
  },
  // 验证是否是文本
  isText(str) {
    return /^\w+$/.test(str);
  },
  // 验证是否是中文
  isChinese(str) {
    return /^[\u4E00-\u9FA5]+$/.test(str);
  },
  // 验证是否是小写字母
  isLower(str) {
    return /^[a-z]+$/.test(str);
  },
  // 验证是否是大写字母
  isUpper(str) {
    return /^[A-Z]+$/.test(str);
  },
};
export default check;
