<template>
  <div class="relative">
    <table v-if="selectedWeek.length" class="base-table min-h-full w-full grow">
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
    </table>

    <Popup />
  </div>
</template>

<script>
import Popup from '@/components/Popup.vue'
import Reservetion from '@/components/Reservation.vue'
import { WEEK_DAY_NAME_FORMAT } from '@/utils/moment.config'
import moment from 'moment'

export default {
  name: 'Calendar',
  components: {
    Reservetion,
    Popup
  },
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
.base-table {
  td,
  tr,
  th {
    @apply border border-table-border-light p-1 text-right font-light dark:border-table-border-dark;
  }

  td,
  th {
    &:has(> .current-date) {
      @apply bg-current-date-bg-light dark:bg-current-date-bg-dark;

      .date-number {
        @apply bg-base-red text-base-white;
      }
    }
  }

  th {
    @apply max-w-100/8;
  }

  tr {
    @apply h-20;
  }
}
</style>
