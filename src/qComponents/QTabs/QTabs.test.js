import Component from './src/QTabs';

describe('QTabs', () => {
  it('should match snapshot', () => {
    const instance = shallowMount(Component);

    expect(instance.element).toMatchSnapshot();
  });

  it('data should match snapshot', () => {
    expect(Component.data()).toMatchSnapshot();
  });
});
