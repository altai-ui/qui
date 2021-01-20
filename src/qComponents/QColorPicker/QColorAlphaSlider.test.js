import Component from './src/QColorAlphaSlider';

describe('QColorAlphaSlider', () => {
  it('should match snapshot', async () => {
    const instance = shallowMount(Component, {
      propsData: {
        color: 'rgba(255,155,155,.5)',
        alpha: 55
      }
    });

    expect(instance.element).toMatchSnapshot();
  });

  it('data should match snapshot', () => {
    expect(Component.data()).toMatchSnapshot();
  });
});
