<template>
  <div class="relative">
    <CalendarHead />

    <template v-if="rooms.length">
      <CalendarRow v-for="(room, index) in rooms" :key="index" :room="room" />
    </template>

    <CalendarEmptyRow v-else />
  </div>
</template>

<script>
import CalendarEmptyRow from '@/components/Calendar/CalendarEmptyRow.vue'
import CalendarHead from '@/components/Calendar/CalendarHead.vue'
import CalendarRow from '@/components/Calendar/CalendarRow.vue'
import bookingMixin from '@/mixins/booking.js'

export default {
  name: 'Calendar',
  components: {
    CalendarHead,
    CalendarRow,
    CalendarEmptyRow
  },
  mixins: [bookingMixin]
}
</script>
