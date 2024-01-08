import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  showPopup: false,
  popupRoom: null
}

const mutations = {
  SET_ROOM(state, popupRoom) {
    state.popupRoom = popupRoom
  },
  SHOW_POPUP(state, boolean) {
    state.showPopup = boolean
  }
}

const actions = {
  setRoom({ commit }, popupRoom) {
    commit('SET_ROOM', popupRoom)
    commit('SHOW_POPUP', true)
  },
  clearRoom({ commit }) {
    commit('SET_ROOM', null)
    commit('SHOW_POPUP', false)
  }
}

const getters = {
  getRoom(state) {
    return state.popupRoom
  },
  getShowPopup(state) {
    return state.showPopup
  }
}

export default { actions, getters, mutations, state }
