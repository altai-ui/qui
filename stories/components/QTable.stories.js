import QTable from '../../src/qComponents/QTable';

const argtypes = {
  total: {
    control: { type1: 'object' }
  },
  childrenKey: {
    table: { disable: true }
  },
  expandable: {
    table: { disable: true }
  },
  indentSize: {
    table: { disable: true }
  },
  uniqueKey: {
    table: { disable: true }
  },
  pagesInExpand: {
    table: { disable: true }
  }
};

const defaultArgs = {
  defaultSort: {
    key: 'right1',
    direction: 'descending'
  },
  rows: [
    {
      left1: '1',
      left2: '2',
      left3: '3',
      right1: '1',
      right2: '2',
      right3: '3'
    },
    {
      left1: '4',
      left2: '5 very very very very long string',
      left3: '6',
      right1: '4',
      right2: '5',
      right3: '6'
    },
    {
      left1: '7',
      left2: '8',
      left3: '9',
      right1: '7',
      right2: '8',
      right3: '9'
    }
  ],
  selectable: true,
  total: {
    grouping: 'total: 3',
    right1: '1',
    right2: '2',
    right3: '3'
  },
  changeSort(sort) {
    console.log('sort', sort);
  },
  customRowClass: ({ rowIndex }) => {
    if (rowIndex === 0) {
      return 'green-row';
    }

    return '';
  },
  customRowStyle: ({ rowIndex }) => {
    if (rowIndex === 2) {
      return { '--row-custom-border-color': '#ff0' };
    }

    return '';
  }
};

export default {
  title: 'Components/QTable',
  component: QTable,
  argTypes: argtypes,
  decorators: [
    () => ({ template: '<div style="width: 90vw;"><story /></div>' })
  ]
};

export const QTableStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes).filter(arg => arg !== 'columns'),
  data() {
    return {
      columns: [
        {
          key: 'one',
          draggable: true,
          color: 'black',
          align: 'left',
          data: [
            {
              fixed: true,
              key: 'left1',
              value: 'Left 1',
              formatter: val => `formatted_${val}`
            },
            {
              fixed: true,
              key: 'left2',
              value: 'Left 2'
            },
            {
              key: 'left3',
              value: 'Left 3',
              sortable: true
            }
          ]
        },
        {
          key: 'two',
          color: 'blue',
          draggable: true,
          data: [
            {
              key: 'right1',
              value: 'Right 1',
              sortable: true,
              slots: {
                header: 'customHeader',
                row: 'customRow'
              }
            },
            {
              key: 'right2',
              value: 'Right 2'
            },
            {
              key: 'right3',
              value: 'Right 3'
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleRowClick(row) {
      console.log(row);
    },
    changeColumnsOrder({ oldPositionIndex, newPositionIndex }) {
      const cols = this.columns;
      cols.splice(newPositionIndex, 0, cols.splice(oldPositionIndex, 1)[0]);
    }
  },
  template: `
    <q-table
      ref="table"
      :columns="columns"
      @change-order="changeColumnsOrder"
      @change-sort="changeSort"
      @row-click="handleRowClick"
      v-bind="$props"
    >
      <template #customHeader="{ column }">
        {{ column.value }} custom
      </template>

      <template #customRow="{ row }">
        {{ row.value }} custom
      </template>
    </q-table>
  `
});

QTableStory.storyName = 'Default';
QTableStory.args = defaultArgs;
