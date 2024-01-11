import { DATE_FORMAT } from '@/utils/moment.config'
import moment from 'moment'

export default {
  computed: {
    week() {
      return this.$store.getters.getWeek
    },
    date() {
      return this.$store.getters.getDate
    },
    rooms() {
      return this.$store.getters.getRooms
    },
    booking() {
      return this.$store.getters.getBooking
    }
  },
  methods: {
    sameDate(date1, date2) {
      return moment(this.getFullDate(date1)).isSame(this.getFullDate(date2))
    },
    getFullDate(date) {
      return moment(date).format(DATE_FORMAT)
    },
    setBooking(book) {
      this.$store.dispatch('setBooking', book)
    },
    setRooms(rooms) {
      this.$store.dispatch('setHotels', rooms)
    },
    setWeek(week) {
      this.$store.dispatch('setWeek', week)
    }
  }
}
