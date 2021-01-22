import Component from './src/QPickerDropdown';

describe('QPickerDropdown', () => {
  it('should match snapshot', async () => {
    const instance = shallowMount(Component);

    expect(instance.element).toMatchSnapshot();
  });

  it('data should match snapshot', () => {
    expect(Component.data()).toMatchSnapshot();
  });
});
