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
  computed: {
    selectedWeek() {
      return this.$store.getters.getSelectedWeek
    },
    selectedDate() {
      return this.$store.getters.getSelectedDate
    },
    selectedWeek() {
      return this.$store.getters.getSelectedWeek
    },
    generateWeek() {
      return (
        !this.selectedWeek.length ||
        !this.currentWeekIncludeCurrentDate(
          this.selectedWeek,
          this.selectedDate
        )
      )
    }
  },
  mounted() {
    const rooms = []

    booking.forEach(({ roomDetails }) => {
      const missingRoom =
        !rooms.length || !rooms.some(({ id }) => id === roomDetails.id)

      if (missingRoom) {
        rooms.push(roomDetails)
      }
    })

    this.$store.dispatch('setHotels', rooms)
  },
  watch: {
    generateWeek: {
      handler(value) {
        if (value) {
          this.setWeek()
        }
      },
      immediate: true
    }
  },
  methods: {
    setWeek() {
      const { weeks, today } = new JsonCalendar({
        ...jsonCalendarOptions,
        today: new Date(this.selectedDate)
      })
      weeks.forEach((week) => {
        const currentWeek = this.currentWeekIncludeCurrentDate(week, today)

        if (currentWeek) {
          this.$store.dispatch('setWeek', week)
        }

        return
      })
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
