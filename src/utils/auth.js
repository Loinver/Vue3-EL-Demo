/*
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-01-19 09:46:23
 * @LastEditors: Linyer
 * @LastEditTime: 2021-08-04 10:36:34
 */
const TokenKey = 'USER_TOKEN';

// 用户token存储
export function getToken() {
  return sessionStorage.getItem(TokenKey) || '';
}

export function setToken(token) {
  return sessionStorage.setItem(TokenKey, decodeURIComponent(token));
}

export function removeToken() {
  return sessionStorage.removeItem(TokenKey);
}
