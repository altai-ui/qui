import Component from './src/QCollapseItem';

describe('QCollapseItem', () => {
  it('should match snapshot', () => {
    const { element } = mount(Component);
    expect(element).toMatchSnapshot();
  });

  it('data should match snapshot', () => {
    expect(Component.data()).toMatchSnapshot();
  });
});
