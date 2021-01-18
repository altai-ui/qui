import Component from './src/QColorSvpanel';

describe('QColorSvpanel', () => {
  it('should match snapshot', async () => {
    const instance = shallowMount(Component, {
      propsData: {
        hue: 100,
        saturation: 50,
        value: 25
      }
    });

    expect(instance.element).toMatchSnapshot();
  });

  it('data should match snapshot', () => {
    expect(Component.data()).toMatchSnapshot();
  });
});
