/*
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-07-21 17:40:52
 * @LastEditors: Linyer
 * @LastEditTime: 2021-08-10 10:44:41
 */
import baseConfig from '@/config';
/**
 * @param {axios} axios实例
 * @param {config} 自定义配置对象，可覆盖掉默认的自定义配置
 */
export default (axios, config = {}) => {
  const defaultConfig = {
    baseURL: baseConfig.baseUrl,
    timeout: 10000,
    // withCredentials: true,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'custom-defined-header-key': 'custom-defined-header-value',
      // 自定义请求头：对所有请求方法生效
      common: {
        'common-defined-key-b': 'custom value: for all methods',
      },
      // 自定义请求头：只对post方法生效
      post: {
        'post-custom-key': 'custom value: only for post method',
      },
      // 自定义请求头：只对get方法生效
      get: {
        'get-custom-key': 'custom value: only for get method',
      },
    },
  };

  Object.assign(axios.defaults, defaultConfig, config);
  return axios;
};
