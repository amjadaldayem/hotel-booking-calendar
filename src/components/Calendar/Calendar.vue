<template>
  <div class="relative">
    <CalendarHead />

    <div
      class="row relative grid grid-cols-8"
      v-for="({ name, reservations }, key) in rooms"
      :key="key"
    >
      <div class="td room-name">{{ name }}</div>

      <div
        class="gap absolute left-0 top-0 col-start-2 grid-cols-8 bg-red-500 p-2"
      />

      <div
        v-for="({ reservation, date }, index) in reservations"
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
import bookingMixin from '@/mixins/booking.js'

export default {
  name: 'Calendar',
  components: {
    Popup,
    CalendarHead
  },
  mixins: [bookingMixin]
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
