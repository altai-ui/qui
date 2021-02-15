import Component from './src/QInputNumber';

describe('QInputNumber', () => {
  it('should match snapshot', () => {
    const { element } = shallowMount(Component);

    expect(element).toMatchSnapshot();
  });

  it('should match snapshot without controls', () => {
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
