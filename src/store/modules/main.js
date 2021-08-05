/*
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-01-13 14:04:40
 * @LastEditors: Linyer
 * @LastEditTime: 2021-07-29 10:43:04
 */
import { getToken } from 'utils/auth';
const state = {
  token: getToken(),
  userInfo: {},
};

const mutations = {
  SET_USER_INFO(state, data) {
    state.userInfo = data;
  },
};

const actions = {
  setUserInfo({ commit }, val) {
    commit('SET_USER_INFO', val);
  },
};

const getters = {
  token: (state) => state.token,
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
