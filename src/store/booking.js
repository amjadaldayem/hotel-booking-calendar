import { DATE_FORMAT } from '@/utils/moment.config'
import moment from 'moment'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  currentDate: moment().format(DATE_FORMAT),
  week: [],
  rooms: [],
  booking: []
}

const mutations = {
  SET_CURRENT_DATE(state, date) {
    state.currentDate = date
  },
  SET_WEEK(state, week) {
    state.week = week
  },
  SET_ROOMS(state, rooms) {
    state.rooms = rooms
  },
  SET_BOOKS(state, booking) {
    state.booking = booking
  }
}

const actions = {
  setSelectedDate({ commit }, date) {
    commit('SET_CURRENT_DATE', date)
  },
  setTodayDate({ commit }) {
    const todayDate = moment().format('L')
    commit('SET_CURRENT_DATE', todayDate)
  },
  setWeek({ commit }, week) {
    commit('SET_WEEK', week)
  },
  setHotels({ commit }, rooms) {
    commit('SET_ROOMS', rooms)
  },
  setBooking({ commit }, booking) {
    commit('SET_BOOKS', booking)
  }
}

const getters = {
  getCurrentDate(state) {
    return state.currentDate
  },
  getWeek(state) {
    return state.week
  },
  getRooms(state) {
    return state.rooms
  },
  getBooking(state) {
    return state.booking
  }
}

export default { actions, getters, mutations, state }
