<template>
  <div class="row relative grid grid-cols-8">
    <div class="td room-name" :style="{ height: `${height}px` }">
      {{ room.name }}
    </div>

    <div ref="list" class="absolute z-10 col-start-2 h-inherit w-full">
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
</template>

<script>
import ReservationItem from '@/components/ReservationItem.vue'
import bookingMixin from '@/mixins/booking.js'

export default {
  name: 'CalendarRow',
  components: {
    ReservationItem
  },
  props: {
    room: Object
  },
  data() {
    return {
      height: 70
    }
  },
  mixins: [bookingMixin],
  mounted() {
    const listHeight = this.$refs.list.clientHeight

    this.setHeight(listHeight)
  },
  updated() {
    const listHeight = this.$refs.list.clientHeight

    if (listHeight !== this.height) {
      this.setHeight(listHeight)
    }
  },
  methods: {
    setHeight(height) {
      this.height = height
    },
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
