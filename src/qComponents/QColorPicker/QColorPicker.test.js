import Component from './src/QColorPicker';

describe('QColorPicker', () => {
  it('should match snapshot', async () => {
    const instance = shallowMount(Component);

    expect(instance.element).toMatchSnapshot();
  });

  it('data should match snapshot', () => {
    expect(Component.data()).toMatchSnapshot();
  });
});
