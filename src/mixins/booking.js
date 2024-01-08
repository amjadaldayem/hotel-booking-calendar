export default {
  computed: {
    selectedWeek() {
      return this.$store.getters.getSelectedWeek
    },
    selectedDate() {
      return this.$store.getters.getSelectedDate
    },
    rooms() {
      return this.$store.getters.getRooms
    }
  }
}
