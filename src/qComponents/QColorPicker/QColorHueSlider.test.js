import Component from './src/QColorHueSlider';

describe('QColorHueSlider', () => {
  it('should match snapshot', async () => {
    const instance = shallowMount(Component, {
      propsData: {
        hue: 155
      }
    });

    expect(instance.element).toMatchSnapshot();
  });

  it('data should match snapshot', () => {
    expect(Component.data()).toMatchSnapshot();
  });
});
