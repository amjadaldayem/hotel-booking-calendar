<template>
  <div class="h-inherit grid grid-cols-7 p-2 pr-0">
    <div
      :class="[
        `ml-2 mr-2 flex min-h-10 cursor-pointer rounded bg-cyan-400 bg-opacity-60 p-1 text-xs font-bold dark:text-base-white`,
        getFromClass(reservation),
        getEndClass(reservation)
      ]"
      @click="togglePopup(reservation)"
    >
      {{ reservation.name }}
    </div>
  </div>
</template>

<script>
import bookingMixin from '@/mixins/booking.js'

const WEEK_DAYS_ABBR = ['mon', 'tue', 'wed', 'thu', 'fri', 'set', 'sun']
const MON_INDEX = 0
const SUN_INDEX = 6
const CLASS_PREFIX = {
  from: 'from',
  to: 'to'
}

export default {
  name: 'ReservationItem',
  props: {
    reservation: {
      type: Object,
      required: true
    }
  },
  mixins: [bookingMixin],
  methods: {
    calculateBookPositionClass({ prefix, weekAbbr }) {
      return `${prefix}-${weekAbbr}`
    },
    getBookClass(date, prefix) {
      const weekDay = this.week.find((weekDay) =>
        this.sameDate(weekDay.date, date)
      )
      const index = this.week.indexOf(weekDay)
      const defaultIndex = prefix === CLASS_PREFIX.from ? MON_INDEX : SUN_INDEX
      const weekAbbr =
        index >= MON_INDEX
          ? WEEK_DAYS_ABBR[index]
          : WEEK_DAYS_ABBR[defaultIndex]

      return this.calculateBookPositionClass({
        prefix,
        weekAbbr
      })
    },

    getFromClass(book) {
      return this.getBookClass(book.start, CLASS_PREFIX.from)
    },

    getEndClass(book) {
      return this.getBookClass(book.end, CLASS_PREFIX.to)
    },
    togglePopup(room) {
      this.$store.dispatch('setRoom', room)
    }
  }
}
</script>

<style lang="scss" scoped>
.from {
  &-mon {
    @apply col-start-1;
  }
  &-tue {
    @apply col-start-2;
  }
  &-wed {
    @apply col-start-3;
  }
  &-thu {
    @apply col-start-4;
  }
  &-fri {
    @apply col-start-5;
  }
  &-sat {
    @apply col-start-6;
  }
  &-sun {
    @apply col-start-7;
  }
}

.to {
  &-mon {
    @apply col-end-2;
  }
  &-tue {
    @apply col-end-3;
  }
  &-wed {
    @apply col-end-4;
  }
  &-thu {
    @apply col-end-5;
  }
  &-fri {
    @apply col-end-6;
  }
  &-sat {
    @apply col-end-7;
  }
  &-sun {
    @apply col-end-8;
  }
}
</style>
