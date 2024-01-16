<template>
  <div class="relative">
    <CalendarHead />

    <CalendarRow v-for="(room, index) in rooms" :key="index" :room="room" />
  </div>
</template>

<script>
import CalendarHead from '@/components/Calendar/CalendarHead.vue'
import CalendarRow from '@/components/Calendar/CalendarRow.vue'
import bookingMixin from '@/mixins/booking.js'

export default {
  name: 'Calendar',
  components: {
    CalendarHead,
    CalendarRow
  },
  mixins: [bookingMixin]
}
</script>
