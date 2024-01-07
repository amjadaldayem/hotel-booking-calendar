import moment from 'moment'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  currentDate: moment().format('L')
}

const mutations = {
  SET_CURRENT_DATE(state, date) {
    state.currentDate = date
  }
}

const actions = {
  setCurrentDate({ commit }, date) {
    commit('SET_CURRENT_DATE', date)
  },
  setTodayDate({ commit }) {
    const todayDate = moment().format('L')
    commit('SET_CURRENT_DATE', todayDate)
  }
}

const getters = {
  getCurrentDate(state) {
    return state.currentDate
  }
}

export default { actions, getters, mutations, state }
