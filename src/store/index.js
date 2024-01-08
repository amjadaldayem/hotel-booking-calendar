import booking from '@/store/booking'
import calendar from '@/store/calendar'
import popup from '@/store/popup'
import Vuex from 'vuex'

export default new Vuex.Store({
  modules: {
    calendar,
    booking,
    popup
  }
})
