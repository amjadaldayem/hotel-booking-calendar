<template>
  <div class="flex items-end gap-1 text-3xl font-light">
    <h1 class="text-3xl font-black">
      {{ selectedMoth }}
    </h1>

    <p>{{ selectedYear }}</p>
  </div>
</template>

<script>
import { MONTH_NAME_FORMAT } from '@/utils/moment.config'
import moment from 'moment'

export default {
  name: 'App',
  computed: {
    selectedDate() {
      return this.$store.getters.getSelectedDate
    },
    selectedYear() {
      return moment(this.selectedDate).year()
    },
    selectedMoth() {
      return moment(this.selectedDate).format(MONTH_NAME_FORMAT)
    }
  }
}
</script>
