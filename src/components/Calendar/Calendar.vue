<template>
  <div ref="calendarElement" class="relative">
    <CalendarHead />

    <div
      class="row relative grid grid-cols-8"
      v-for="(room, key) in rooms"
      :key="key"
    >
      <div class="td room-name h-[200px]">{{ room.name }}</div>

      <div
        class="h-inherit reservation-container absolute z-10 col-start-2 w-full"
      >
        <ReservationItem
          v-for="book in getBookingForRoom(room)"
          :reservation="book"
        />
      </div>

      <div
        v-for="({ date }, index) in week"
        :class="['td', { 'current-date': sameDate(currentDate, date) }]"
        :key="index"
      />
    </div>
    <Popup />
  </div>
</template>

<script>
import CalendarHead from '@/components/Calendar/CalendarHead.vue'
import Popup from '@/components/Popup.vue'
import ReservationItem from '@/components/ReservationItem.vue'
import bookingMixin from '@/mixins/booking.js'

export default {
  name: 'Calendar',
  components: {
    ReservationItem,
    Popup,
    CalendarHead
  },
  mixins: [bookingMixin],
  watch: {
    week: {
      handler(value) {
        this.$nextTick(
          console.log(document.querySelectorAll('.reservation-container'))
        )
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    getBookingForRoom(room) {
      return (
        this.booking.filter(
          ({ roomDetails: { name } }) => name === room.name
        ) ?? []
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.row {
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

  .td.current-date {
    @apply bg-current-date-bg-light dark:bg-current-date-bg-dark;
  }
}
</style>
