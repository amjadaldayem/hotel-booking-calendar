<template>
  <div
    ref="target"
    v-if="showPopup"
    class="mx-1/2 absolute bottom-0 left-0 top-1/4 mt-9 flex h-min flex-col gap-2 rounded-lg border border-table-border-light bg-white p-4 text-left text-base-black shadow ring-0 dark:border-table-border-dark dark:bg-base-black dark:text-base-white"
    v-click-outside="clearPopup"
  >
    <div class="text-lg font-bold">{{ reservation.name }}</div>
    <div class="font-normal">{{ reservation.email }}</div>
    <div class="font-normal">{{ reservation.phone }}</div>

    <div class="flex gap-1">
      <div class="font-bold">Children:</div>

      <div class="font-normal">{{ reservation.guestInfo.children }}</div>
    </div>

    <div class="flex gap-1">
      <div class="font-bold">Adults:</div>

      <div class="font-normal">{{ reservation.guestInfo.adults }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup',
  computed: {
    showPopup() {
      return this.$store.getters.getShowPopup
    },
    reservation() {
      return this.$store.getters.getRoom
    }
  },
  methods: {
    clearPopup() {
      this.$store.dispatch('clearRoom')
    }
  }
}
</script>
