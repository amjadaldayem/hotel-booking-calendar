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
  mixins: [bookingMixin],
  computed: {
    needGenerateWeek() {
      return !this.isDateInSelectedWeek(this.week, this.date)
    }
  },
  watch: {
    needGenerateWeek: {
      async handler(boolean) {
        if (boolean) {
          await this.buildWeek()
        }
      },
      immediate: true
    }
  },
  methods: {
    async buildWeek() {
      this.calculateWeek()
      this.calculateBooking()
      this.calculateRooms()
    },
    getCalendar() {
      return new JsonCalendar({
        ...jsonCalendarOptions,
        today: new Date(this.date)
      })
    },
    calculateWeek() {
      const { weeks, today } = this.getCalendar()

      const currentWeek = weeks
        .find((week) => this.isDateInSelectedWeek(week, today))
        .map((day) => ({ date: this.getFullDate(day.date) }))

      this.setWeek(currentWeek)
    },
    calculateBooking() {
      const books = bookingData.filter(({ start, end }) =>
        this.week.some(({ date }) =>
          this.dateIncludePeriod(date, { start, end })
        )
      )

      this.setBooking(books)
    },
    calculateRooms() {
      const rooms = [
        ...new Set(
          [...this.booking].map(({ roomDetails: { name } }) => name).sort()
        )
      ].map((name) => ({ name }))

      this.setRooms(rooms)
    },
    dateIncludePeriod(currentDate, { start, end }) {
      const fullCurrentDate = this.getFullDate(currentDate)
      const fullStartDate = this.getFullDate(start)
      const fullEndDate = this.getFullDate(end)

      return (
        fullEndDate === fullCurrentDate ||
        fullCurrentDate === fullStartDate ||
        (moment(fullEndDate).isAfter(fullCurrentDate) &&
          moment(fullStartDate).isBefore(fullCurrentDate))
      )
    },
    isDateInSelectedWeek(selectedWeek, selectedDate) {
      return (
        selectedWeek.some(({ date }) => this.sameDate(date, selectedDate)) ??
        false
      )
    }
  }
}
</script>
