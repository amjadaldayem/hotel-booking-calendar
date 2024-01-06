<template>
  <div class="min-h-screen w-full bg-white p-4 dark:bg-black">
    <BaseTable />
  </div>
</template>

<script>
import BaseTable from '@/components/BaseTable.vue'

export default {
  name: 'App',
  components: {
    BaseTable
  },
  data() {
    return {}
  }
}
</script>
