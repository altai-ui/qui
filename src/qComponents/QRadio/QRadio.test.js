import Component from './src/QRadio';

describe('QRadio', () => {
  it('should match snapshot', () => {
    const { element } = shallowMount(Component);

    expect(element).toMatchSnapshot();
  });
});
