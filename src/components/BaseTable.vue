<template>
  <table v-if="week.length" class="base-table min-h-full w-full">
    <tr>
      <th />

      <th v-for="({ date }, key) in week" :key="key">
        <div
          :class="[
            { 'current-date': sameDate(date, currentDate) },
            'flex items-center justify-between'
          ]"
        >
          <div
            class="dark:text-base-black date-number dark:bg-base-white flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium"
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

      <td v-for="({ date }, key) in week" :key="key">
        <div :class="{ 'current-date': sameDate(date, currentDate) }">
          Day info
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
import { JsonCalendar } from 'json-calendar'
import moment from 'moment'

export default {
  name: 'BaseTable',
  data() {
    return {
      week: []
    }
  },
  computed: {
    currentDate() {
      return this.$store.getters.getCurrentDate
    }
  },
  mounted() {
    this.setWeek()
  },
  methods: {
    setWeek() {
      const WEEK_DAY_INDEX = 1

      const calendarOptions = {
        today: new Date(this.currentDate),
        firstDayOfWeek: WEEK_DAY_INDEX
      }

      const { weeks, today } = new JsonCalendar(calendarOptions)

      weeks.forEach((week) => {
        const currentWeek = this.currentWeekIncludeCurrentDate(week, today)

        if (currentWeek) {
          this.week = week
        }

        return
      })
    },
    sameDate(date1, date2) {
      return moment(date1).isSame(date2)
    },
    currentWeekIncludeCurrentDate(currentWeek, currentDate) {
      return (
        currentWeek.some(({ date }) => this.sameDate(date, currentDate)) ??
        false
      )
    },
    getWeekDayAbbr(date) {
      const dayFullName = moment(date).format('dddd')

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
    @apply border-base-table-border  border p-1 text-right font-light;
  }
}

td,
th {
  &:has(> .current-date) {
    @apply dark:bg-current-date-bg;

    .date-number {
      @apply bg-base-red text-base-white;
    }
  }
}
</style>
