<template>
  <div
    class="flex min-h-screen w-full flex-col gap-4 bg-white p-4 font-light dark:bg-base-black dark:text-base-white"
  >
    <header class="flex items-center justify-between">
      <div class="flex items-end gap-1 text-3xl font-light">
        <h1 class="text-3xl font-black">
          {{ selectedMoth }}
        </h1>

        <p>{{ selectedYear }}</p>
      </div>

      <NavBar />
    </header>

    <BaseTable />
  </div>
</template>

<script>
import BaseTable from '@/components/BaseCalendar.vue'
import NavBar from '@/components/NavBar.vue'
import { MONTH_NAME_FORMAT } from '@/utils/moment.config'
import moment from 'moment'

export default {
  name: 'App',
  components: {
    NavBar,
    BaseTable
  },
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
