<template>
  <div
    class="flex min-h-screen min-w-full flex-col gap-4 bg-white p-4 font-light dark:bg-base-black dark:text-base-white"
  >
    <header class="flex items-center justify-between">
      <Article />

      <NavBar />
    </header>

    <Calendar />
  </div>
</template>

<script>
import bookingData from '@/booking.json'
import Article from '@/components/Article.vue'
import Calendar from '@/components/Calendar.vue'
import NavBar from '@/components/NavBar.vue'
import bookingMixin from '@/mixins/booking.js'
import { options as jsonCalendarOptions } from '@/utils/json-calendar.config'
import { JsonCalendar } from 'json-calendar'
import moment from 'moment'

export default {
  name: 'App',
  components: {
    NavBar,
    Calendar,
    Article
  },
  data() {
    return {
      bookingData
    }
  },
  mixins: [bookingMixin],
  computed: {
    needGenerateWeek() {
      return !this.currentWeekIncludeCurrentDate(
        this.selectedWeek,
        this.selectedDate
      )
    }
  },
  mounted() {
    this.generateWeek()
    this.generateRooms()
  },
  watch: {
    needGenerateWeek: {
      async handler(value) {
        if (value) {
          this.generateWeek()
          this.generateRooms()
        }
      },
      immediate: true
    }
  },
  methods: {
    generateWeek() {
      const { weeks, today } = new JsonCalendar({
        ...jsonCalendarOptions,
        today: new Date(this.selectedDate)
      })

      weeks.forEach((week) => {
        const includeWeek = this.currentWeekIncludeCurrentDate(week, today)

        if (includeWeek) {
          const currentWeek = [...week].map((day) => {
            const date = moment(day.date).format('L')

            return { ...day, date }
          })

          this.setWeek(currentWeek)
        }

        return
      })
    },
    generateRooms() {
      let rooms = []

      bookingData.forEach(({ roomDetails }) => {
        const missingRoom =
          !rooms.length || !rooms.some(({ id }) => id === roomDetails.id)

        if (missingRoom) {
          rooms.push(roomDetails)
        }
      })

      rooms.sort((room1, room2) => room1.id - room2.id)

      rooms = rooms.map((room) => {
        const roomBooking = this.bookingData
          .filter(({ roomDetails }) => room.id === roomDetails.id)
          .map((book) => ({
            ...book,
            start: moment(book.start).format('L'),
            end: moment(book.end).format('L')
          }))

        const reservations = [...this.selectedWeek].map((day) => {
          const reservation = []

          roomBooking.forEach((book) => {
            if (
              book.end === day.date ||
              day.date === book.start ||
              (moment(book.end).isAfter(day.date) &&
                moment(book.start).isBefore(day.date))
            ) {
              reservation.push(book)
            }
          })

          reservation.sort((a, b) => b.id - a.id)

          return { date: day.date, reservation }
        })

        return { ...room, reservations }
      })
      this.setRooms(rooms)
    },
    generateDateReservation(date) {
      return [...bookingData]
        .map((book) => {
          const currentDate = new Date(moment(date))
          const startDate = new Date(moment(book.start))
          const endDate = new Date(moment(book.end))
          const start = this.sameDate(startDate, currentDate)
          const end = this.sameDate(endDate, currentDate)
          const include =
            moment(currentDate).isBefore(endDate) &&
            moment(currentDate).isAfter(startDate)

          const currentBook = { ...book }

          if (include || start || end) {
            return currentBook
          }
        })
        .filter((book) => book)
    },
    setRooms(rooms) {
      this.$store.dispatch('setHotels', rooms)
    },
    setWeek(week) {
      this.$store.dispatch('setWeek', week)
    },
    sameDate(date1, date2) {
      return moment(date1).isSame(date2)
    },
    currentWeekIncludeCurrentDate(selectedWeek, selectedDate) {
      return (
        selectedWeek.some(({ date }) => this.sameDate(date, selectedDate)) ??
        false
      )
    }
  }
}
</script>
