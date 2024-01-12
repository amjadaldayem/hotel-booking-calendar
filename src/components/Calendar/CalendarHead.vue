<template>
  <div v-if="week.length" class="row grid grid-cols-8">
    <div class="th" />

    <div class="th" v-for="({ date }, index) in week" :key="index">
      <div
        :class="[
          { 'current-date': sameDate(currentDate, date) },
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
    </div>
  </div>
</template>

<script>
import bookingMixin from '@/mixins/booking.js'
import { WEEK_DAY_NAME_FORMAT } from '@/utils/moment.config'
import moment from 'moment'
export default {
  name: 'CalendarHead',
  mixins: [bookingMixin],
  methods: {
    getWeekDayAbbr(date) {
      const dayFullName = moment(date).format(WEEK_DAY_NAME_FORMAT)

      return dayFullName.slice(0, 3)
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
  .th {
    @apply border border-r-0 border-table-border-light p-1 text-right font-light dark:border-table-border-dark;

    &:last-child {
      @apply border-r;
    }
  }

  //Current Date
  .th {
    &:has(> .current-date) {
      @apply bg-current-date-bg-light dark:bg-current-date-bg-dark;

      .date-number {
        @apply bg-base-red text-white;
      }
    }
  }
}
</style>
