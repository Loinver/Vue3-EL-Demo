/*
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-01-13 14:04:40
 * @LastEditors: Linyer
 * @LastEditTime: 2021-08-16 15:48:53
 */
const state = {
  drawingList: [], // 绘制的组件列表
};

const mutations = {
  SET_DRAW_LIST(state, data) {
    state.drawingList.push(data);
    console.log(state.drawingList);
  },
};

const actions = {
  setDrawList({ commit }, data) {
    commit('SET_DRAW_LIST', data);
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
