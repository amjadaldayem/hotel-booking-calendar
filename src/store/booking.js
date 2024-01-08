import moment from 'moment'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  selectedDate: moment().format('L'),
  selectedWeek: [],
  rooms: []
}

const mutations = {
  SET_DATE(state, date) {
    state.selectedDate = date
  },
  SET_WEEK(state, week) {
    state.selectedWeek = week
  },
  SET_ROOMS(state, rooms) {
    state.rooms = rooms
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
  },
  setHotels({ commit }, rooms) {
    commit('SET_ROOMS', rooms)
  }
}

const getters = {
  getSelectedDate(state) {
    return state.selectedDate
  },
  getSelectedWeek(state) {
    return state.selectedWeek
  },
  getRooms(state) {
    return state.rooms
  }
}

export default { actions, getters, mutations, state }
