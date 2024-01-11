<template>
  <div class="relative">
    <!-- Dates -->
    <div class="row grid grid-cols-8">
      <div class="th" />

      <div
        class="th"
        v-for="({ date: currentDate }, index) in week"
        :key="index"
      >
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

    <div
      class="row relative grid grid-cols-8"
      v-for="({ name, reservations }, key) in rooms"
    >
      <div class="td room-name">{{ name }}</div>

      <div
        class="gap absolute left-0 top-0 col-start-2 grid-cols-8 bg-red-500 p-2"
      />

      <div
        v-for="({ reservation, date: currentDate }, index) in reservations"
        :class="['td', { 'current-date': sameDate(currentDate, date) }]"
        :key="index"
      />
    </div>
    <Popup />
  </div>
</template>

<script>
import Popup from '@/components/Popup.vue'
import Reservetion from '@/components/Reservation.vue'
import bookingMixin from '@/mixins/booking.js'
import { WEEK_DAY_NAME_FORMAT } from '@/utils/moment.config'
import moment from 'moment'
export default {
  name: 'Calendar',
  components: {
    Reservetion,
    Popup
  },
  mixins: [bookingMixin],
  methods: {
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
.row {
  .th,
  .td {
    @apply border border-r-0 border-table-border-light p-1 text-right font-light dark:border-table-border-dark;

    &:last-child {
      @apply border-r;
    }
  }

  .td {
    @apply border-t-0;

    &.room-name {
      @apply text-left text-sm font-bold;
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

  .td.current-date {
    @apply bg-current-date-bg-light dark:bg-current-date-bg-dark;
  }
}
</style>
