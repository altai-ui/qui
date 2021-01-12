import Component from './index';

describe('QTable', () => {
  const options = {
    propsData: {
      groupsOfColumns: [
        {
          columns: [
            {
              key: 'col1',
              value: 'Column 1'
            }
          ]
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
    const { element } = shallowMount(Component, options);

    expect(element).toMatchSnapshot();
  });
});
