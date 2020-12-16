import { shallowMount } from '@vue/test-utils';
import { QTable } from '../../src/qComponents';

describe('QTable.vue', () => {
  let options = {
    propsData: {
      columns: [
        {
          key: 'col1',
          value: 'Column 1'
        }
      ],
      rows: [
        {
          col1: 'Columns row 1'
        }
      ]
    }
  };

  it('QTable should match snapshot', () => {
    const { element } = shallowMount(QTable, options);

    expect(element).toMatchSnapshot();
  });

  it('Should process grid prop', () => {
    options.propsData = {
      ...options.propsData,
      grid: true
    };
    const { vm } = shallowMount(QTable, options);

    expect(vm.tableClasses).toEqual({
      'q-table__draggable': false,
      'q-table__fixed-cols': 0,
      'q-table__grid': true,
      'q-table__selectable': false,
      'q-table__separated': false
    });
  });
});
