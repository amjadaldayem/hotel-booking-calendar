<template>
  <div class="flex items-end gap-1 text-3xl font-light">
    <h1 class="text-3xl font-black">
      {{ selectedMoth }}
    </h1>

    <p>{{ selectedYear }}</p>
  </div>
</template>

<script>
import bookingMixin from '@/mixins/booking.js'
import { MONTH_NAME_FORMAT } from '@/utils/moment.config'
import moment from 'moment'

export default {
  name: 'App',
  mixins: [bookingMixin],
  computed: {
    selectedYear() {
      return moment(this.currentDate).year()
    },
    selectedMoth() {
      return moment(this.currentDate).format(MONTH_NAME_FORMAT)
    }
  }
}
</script>
