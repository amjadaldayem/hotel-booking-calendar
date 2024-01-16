<template>
  <div class="grid h-8 grid-cols-8">
    <p class="absolute z-10 mt-1 w-full text-center">Empty</p>
    <div
      v-for="item in new Array(8)"
      class="bg-current-date-bg-light opacity-75 dark:bg-current-date-bg-dark"
    />
  </div>
</template>

<script>
export default {
  name: 'CalendarEmptyRow'
}
</script>
