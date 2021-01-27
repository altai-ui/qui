import Component from './src/QInputNumber.vue';

describe('QInputNumber', () => {
  it('should match snapshot', async () => {
    const { element } = shallowMount(Component);

    expect(element).toMatchSnapshot();
  });

  it('should match snapshot without controls', async () => {
    const { element } = shallowMount(Component, {
      propsData: {
        controls: false
      }
    });

    expect(element).toMatchSnapshot();
  });

  it('data should match snapshot', () => {
    expect(Component.data()).toMatchSnapshot();
  });
});
