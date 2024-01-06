<template>
  <table class="base-table min-h-full w-full dark:text-white">
    <tr>
      <th>Company</th>
      <th>Contact</th>
      <th>Country</th>
    </tr>
    <tr>
      <td>Alfreds Futterkiste</td>
      <td>Maria Anders</td>
      <td>Germany</td>
    </tr>
    <tr>
      <td>Centro comercial Moctezuma</td>
      <td>Francisco Chang</td>
      <td>Mexico</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'BaseTable',
  components: {},
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.base-table {
  td,
  tr,
  th {
    @apply border  border-base-blue;
  }
}
</style>
