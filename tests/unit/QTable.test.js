import { shallowMount } from '@vue/test-utils';
import { QTable } from '../../src/qComponents';

describe('QTable.vue', () => {
  const options = {
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
});
