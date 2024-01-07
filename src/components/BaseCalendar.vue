<template>
  <table v-if="selectedWeek.length" class="base-table min-h-full w-full">
    <tr>
      <th />

      <th v-for="({ date }, key) in selectedWeek" :key="key">
        <div
          :class="[
            { 'current-date': sameDate(date, selectedDate) },
            'flex items-center justify-between'
          ]"
        >
          <div
            class="date-number flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs font-medium text-white dark:bg-base-white dark:text-base-black"
          >
            {{ getDateNumber(date) }}
          </div>

          {{ getWeekDayAbbr(date) }}
        </div>
      </th>
    </tr>

    <tr>
      <td>
        <p class="text-left">Hotel name</p>
      </td>

      <td v-for="({ date }, key) in selectedWeek" :key="key">
        <div :class="{ 'current-date': sameDate(date, selectedDate) }">
          Day info
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
import { options as jsonCalendarOptions } from '@/utils/json-calendar.config.js'
import { WEEK_DAY_NAME_FORMAT } from '@/utils/moment.config'
import { JsonCalendar } from 'json-calendar'
import moment from 'moment'

export default {
  name: 'BaseCalendar',
  computed: {
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
    },
    getWeekDayAbbr(date) {
      const dayFullName = moment(date).format(WEEK_DAY_NAME_FORMAT)

      return dayFullName.slice(0, 3)
    },
    getDateNumber(date) {
      return moment(date).date()
    }
  }
}
</script>

<style lang="scss" scoped>
.base-table {
  td,
  tr,
  th {
    @apply dark:border-table-border-dark border-table-border-light border p-1 text-right font-light;
  }
}

td,
th {
  &:has(> .current-date) {
    @apply dark:bg-current-date-bg-dark bg-current-date-bg-light;

    .date-number {
      @apply bg-base-red text-base-white;
    }
  }
}
</style>
