import moment from 'moment'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  selectedDate: moment().format('L'),
  selectedWeek: []
}

const mutations = {
  SET_DATE(state, date) {
    state.selectedDate = date
  },
  SET_WEEK(state, week) {
    state.selectedWeek = week
  }
}

const actions = {
  setSelectedDate({ commit }, date) {
    commit('SET_DATE', date)
  },
  setTodayDate({ commit }) {
    const todayDate = moment().format('L')
    commit('SET_DATE', todayDate)
  },
  setWeek({ commit }, week) {
    commit('SET_WEEK', week)
  }
}

const getters = {
  getSelectedDate(state) {
    return state.selectedDate
  },
  getSelectedWeek(state) {
    return state.selectedWeek
  }
}

export default { actions, getters, mutations, state }
