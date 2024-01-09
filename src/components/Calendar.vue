<template>
  <div class="relative">
    <!-- <table v-if="selectedWeek.length" class="row min-h-full w-full grow">
      <tr class="h-10">
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

      <tr
        class="align-top"
        v-for="({ name, id: roomId }, key) in rooms"
        :key="key"
      >
        <td>
          <div class="text-left text-sm font-medium">
            {{ name }}
          </div>
        </td>

        <td v-for="({ date, reservation }, key) in selectedWeek" :key="key">
          <div
            :class="[
              { 'current-date': sameDate(date, selectedDate) },
              'flex flex-wrap'
            ]"
          >
            <Reservetion
              v-for="(order, key) in getSelectedReservetions(
                reservation,
                roomId
              )"
              v-if="includeDate(roomId, reservation)"
              :reservation="order"
              :key="key"
            />
          </div>
        </td>
      </tr>
    </table> -->

    <!-- Dates -->
    <div class="row grid grid-cols-8">
      <div class="th" />

      <div class="th" v-for="({ date }, index) in selectedWeek" :key="index">
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
      </div>
    </div>

    <div
      class="row relative grid grid-cols-8"
      v-for="({ name, reservations }, key) in rooms"
    >
      <div class="td room-name">{{ name }}</div>

      <div class="gap absolute left-0 top-0 grid-cols-8 bg-white p-5"></div>

      <div
        class="td"
        v-for="({ reservation }, index) in reservations"
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
    getSelectedReservetions(reservationArray, roomId) {
      return (
        reservationArray
          .filter(({ roomDetails }) => roomDetails.id === roomId)
          .sort(
            (first, second) => new Date(first.start) - new Date(second.start)
          ) ?? null
      )
    },
    includeDate(roomId, reservationArray) {
      const rooms = this.getSelectedRoomReservations(roomId, reservationArray)

      if (!rooms.length) return false

      return rooms
    },
    getSelectedRoomReservations(roomId, reservationArray) {
      if (!reservationArray.length) return false

      const reservation = this.getSelectedReservetions(reservationArray, roomId)

      if (!reservation.length) return false

      return reservation
    },
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

  .th,
  .td {
    &:has(> .current-date) {
      @apply bg-current-date-bg-light dark:bg-current-date-bg-dark;

      .date-number {
        @apply bg-base-red text-base-white;
      }
    }
  }
  // td,

  // th {
  //   @apply max-w-100/8;
  // }

  // tr {
  //   @apply h-20;
  // }
}
</style>
