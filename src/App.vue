<template>
  <div
    class="dark:bg-base-black dark:text-base-white flex min-h-screen w-full flex-col gap-4 bg-white p-4 font-light"
  >
    <header class="flex items-center justify-between">
      <div class="flex items-end gap-1 text-3xl font-light">
        <h1 class="text-3xl font-black">Month</h1>

        <p>year</p>
      </div>

      <NavBar />
    </header>

    <BaseTable />
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable.vue'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    BaseTable
  },
  data() {
    return {}
  }
}
</script>
