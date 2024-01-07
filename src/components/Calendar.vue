<template>
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
          :class="[{ 'current-date': sameDate(date, selectedDate) }, 'flex']"
        >
          <Reservetion
            v-if="includeDate(roomId, reservation)"
            :reservation="getSelectedReservetion(reservation, roomId)"
          />
        </div>
      </td>
    </tr>
  </table>
</template>

<script>
import Reservetion from '@/components/Reservation.vue'
import { WEEK_DAY_NAME_FORMAT } from '@/utils/moment.config'
import { RESERVATION_STATUS } from '@/utils/reservation.config'
import moment from 'moment'

export default {
  name: 'Calendar',
  components: {
    Reservetion
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
    getSelectedReservetion(reservationArray, roomId) {
      return (
        reservationArray.find(({ roomDetails }) => roomDetails.id === roomId) ??
        null
      )
    },
    includeDate(roomId, reservationArray) {
      const roomDetails = this.getRoomDetails(roomId, reservationArray)

      if (!roomDetails) return false

      console.log()
      return roomDetails
    },
    startDate(roomId, reservationArray) {
      const roomDetails = this.getRoomDetails(roomId, reservationArray)

      if (!roomDetails) return false

      return roomDetails.status === RESERVATION_STATUS.start
    },
    endDate(roomId, reservationArray) {
      const roomDetails = this.getRoomDetails(roomId, reservationArray)

      if (!roomDetails) return false

      return roomDetails.status === RESERVATION_STATUS.end
    },
    getRoomDetails(roomId, reservationArray) {
      if (!reservationArray.length) return false

      const reservation = this.getSelectedReservetion(reservationArray, roomId)

      if (!reservation) return false

      return reservation.roomDetails
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
    @apply w-100/8;
  }
}
</style>
