<template>
  <div class="flex max-h-5 items-center gap-1">
    <button
      class="border-nav-grey flex h-5 w-5 items-center justify-center rounded shadow dark:bg-nav-bar-back"
      @click="setBeforeDate"
    >
      <Icon
        class="dark:text-white"
        icon="ic:round-arrow-back-ios"
        height="14px"
      />
    </button>

    <button
      class="border-nav-grey flex h-5 max-h-5 items-center justify-center rounded px-2 py-1 text-sm font-normal shadow dark:bg-nav-bar-back dark:text-white"
      @click="setTodayDate"
    >
      Today
    </button>

    <button
      class="border-nav-grey flex h-5 w-5 items-center justify-center rounded shadow dark:bg-nav-bar-back"
      @click="setNextDate"
    >
      <Icon
        class="dark:text-white"
        icon="ic:round-arrow-forward-ios"
        height="14px"
      />
    </button>
  </div>
</template>

<script>
import { ACTION_TARGET, DATE_FORMAT, ONE_DAY } from '@/utils/moment.config'
import { Icon } from '@iconify/vue2'
import moment from 'moment'

export default {
  name: 'NavBar',
  components: {
    Icon
  },
  computed: {
    selectedDate() {
      return this.$store.getters.getSelectedDate
    }
  },
  mounted() {
    document.addEventListener('keydown', this.keydownEvent)
  },
  methods: {
    keydownEvent({ key }) {
      switch (key) {
        case 'ArrowLeft':
          this.setBeforeDate()
          break
        case 'ArrowRight':
          this.setNextDate()
          break
      }
    },
    setTodayDate() {
      this.$store.dispatch('setTodayDate')
    },
    setBeforeDate() {
      const date = moment(this.selectedDate)
        .subtract(ONE_DAY, ACTION_TARGET)
        .format(DATE_FORMAT)

      this.$store.dispatch('setSelectedDate', date)
    },
    setNextDate() {
      const date = moment(this.selectedDate)
        .add(ONE_DAY, ACTION_TARGET)
        .format(DATE_FORMAT)

      this.$store.dispatch('setSelectedDate', date)
    }
  }
}
</script>
