export default (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  methods: {
    handleRowClick(row) {
      console.log(row);
    },
    changeColumnsOrder(groupsOfColumns) {
      this.groupsOfColumns = groupsOfColumns;
    }
  },
  template: `
    <q-table
      ref="table"
      :groups-of-columns="groupsOfColumns"
      @change-order="changeColumnsOrder"
      @change-sort="changeSort"
      @row-click="handleRowClick"
      v-bind="$props"
    >
      <template #customHeader="{ value }">
        {{ value }} custom
      </template>

      <template #customRow="{ value }">
        {{ value }} custom
      </template>
    </q-table>
  `
});
