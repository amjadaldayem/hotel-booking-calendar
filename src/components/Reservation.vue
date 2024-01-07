<template>
  <div
    class="my-4 flex min-h-10 w-full gap-1 rounded bg-cyan-400 bg-opacity-60 p-1 text-xs font-bold"
  >
    {{ reservation.name }}
  </div>
</template>

<script>
export default {
  name: 'Reservation',
  props: {
    reservation: {
      type: Object,
      required: true
    }
  }
}
</script>
