import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  rooms: []
}

const mutations = {
  SET_ROOMS(state, rooms) {
    state.rooms = rooms
  }
}

const actions = {
  setHotels({ commit }, rooms) {
    commit('SET_ROOMS', rooms)
  }
}

const getters = {
  getRooms(state) {
    return state.rooms
  }
}

export default { actions, getters, mutations, state }
