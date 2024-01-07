<template>
  <div
    class="flex min-h-screen w-full flex-col gap-4 bg-white p-4 font-light dark:bg-base-black dark:text-base-white"
  >
    <header class="flex items-center justify-between">
      <Article />

      <NavBar />
    </header>

    <Calendar />
  </div>
</template>

<script>
import booking from '@/booking.json'
import Article from '@/components/Article.vue'
import Calendar from '@/components/Calendar.vue'
import NavBar from '@/components/NavBar.vue'
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
      booking
    }
  },
  computed: {
    needGenerateWeek() {
      return !this.currentWeekIncludeCurrentDate(
        this.selectedWeek,
        this.selectedDate
      )
    },
    selectedWeek() {
      return this.$store.getters.getSelectedWeek
    },
    selectedDate() {
      return this.$store.getters.getSelectedDate
    },
    rooms() {
      return this.$store.getters.getRooms
    }
  },
  mounted() {
    this.generateRooms()
    this.generateWeek()
  },
  watch: {
    needGenerateWeek: {
      async handler(value) {
        if (value) {
          this.generateWeek()
          this.setReservation()
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
            const reservation = this.generateDateReservation(day.date)

            return { ...day, reservation }
          })

          this.setWeek(currentWeek)
        }

        return
      })
    },
    generateRooms() {
      const rooms = []

      booking.forEach(({ roomDetails }) => {
        const missingRoom =
          !rooms.length || !rooms.some(({ id }) => id === roomDetails.id)

        if (missingRoom) {
          rooms.push(roomDetails)
        }
      })

      this.setRooms(rooms)
    },
    generateDateReservation(date) {
      return [...booking]
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
    setReservation() {
      // this.rooms.forEach()
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
