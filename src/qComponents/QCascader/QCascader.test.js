import Component from './src/QCascader';

describe('QCascader', () => {
  it('should match snapshot', () => {
    const { element } = shallowMount(Component);
    expect(element).toMatchSnapshot();
  });
});
