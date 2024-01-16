<template>
  <div
    class="flex min-h-screen min-w-full flex-col gap-4 bg-white p-4 font-light dark:bg-base-black dark:text-base-white"
  >
    <header class="flex items-center justify-between">
      <Article />

      <NavBar />
    </header>

    <Calendar />

    <Popup />
  </div>
</template>

<script>
import bookingData from '@/booking.json'
import Article from '@/components/Article.vue'
import Calendar from '@/components/Calendar/Calendar.vue'
import NavBar from '@/components/NavBar.vue'
import Popup from '@/components/Popup.vue'
import bookingMixin from '@/mixins/booking.js'
import { options as jsonCalendarOptions } from '@/utils/json-calendar.config'
import { JsonCalendar } from 'json-calendar'
import moment from 'moment'

export default {
  name: 'App',
  components: {
    Popup,
    NavBar,
    Calendar,
    Article
  },
  mixins: [bookingMixin],
  computed: {
    needGenerateWeek() {
      return !this.isDateInSelectedWeek(this.week, this.currentDate)
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
    getCalendar() {
      return new JsonCalendar({
        ...jsonCalendarOptions,
        today: new Date(this.currentDate)
      })
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
