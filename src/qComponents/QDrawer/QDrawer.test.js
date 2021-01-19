import Component from './src/QDrawer';

describe('QDrawer', () => {
  it('should match snapshot', async () => {
    const instance = shallowMount(Component);

    await instance.setProps({
      visible: true
    });

    expect(instance.element).toMatchSnapshot();
  });

  it('data should match snapshot', () => {
    expect(Component.data()).toMatchSnapshot();
  });
});
