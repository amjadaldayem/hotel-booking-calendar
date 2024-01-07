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

    <tr v-for="({ name }, key) in rooms" :key="key">
      <td>
        <p class="text-left font-medium">{{ name }}</p>
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
import { WEEK_DAY_NAME_FORMAT } from '@/utils/moment.config'
import moment from 'moment'

export default {
  name: 'Calendar',
  computed: {
    selectedDate() {
      return this.$store.getters.getSelectedDate
    },
    selectedWeek() {
      return this.$store.getters.getSelectedWeek
    },
    rooms() {
      return this.$store.getters.getRooms
    }
  },
  methods: {
    sameDate(date1, date2) {
      return moment(date1).isSame(date2)
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
