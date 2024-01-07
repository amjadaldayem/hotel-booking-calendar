<template>
  <div class="flex max-h-5 items-center gap-1">
    <button
      class="bg-nav-bar-back flex h-5 w-5 items-center justify-center rounded"
      @click="setBeforeDate"
    >
      <Icon icon="ic:round-arrow-back-ios" height="14px" />
    </button>

    <button
      class="bg-nav-bar-back flex h-5 max-h-5 items-center justify-center rounded px-2 py-1 text-sm"
      @click="setTodayDate"
    >
      Today
    </button>

    <button
      class="bg-nav-bar-back flex h-5 w-5 items-center justify-center rounded disabled:opacity-70"
      @click="setNextDate"
      :disabled="disableNextButton"
    >
      <Icon icon="ic:round-arrow-forward-ios" height="14px" />
    </button>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue2'
import moment from 'moment'

export default {
  name: 'NavBar',
  components: {
    Icon
  },
  computed: {
    disableNextButton() {
      const now = moment().format('L')
      const date2 = moment(this.currentDate).format('L')

      return moment(now).isSame(date2)
    },
    currentDate() {
      return this.$store.getters.getCurrentDate
    }
  },
  methods: {
    setTodayDate() {
      this.$store.dispatch('setTodayDate')
    },
    setBeforeDate() {
      const date = moment(this.currentDate).subtract(1, 'day').format('L')

      this.$store.dispatch('setCurrentDate', date)
    },
    setNextDate() {
      const date = moment(this.currentDate).add(1, 'day').format('L')

      this.$store.dispatch('setCurrentDate', date)
    }
  }
}
</script>
