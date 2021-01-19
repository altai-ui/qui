import Component from './src/QCol';

describe('QCol', () => {
  it('should match snapshot', async () => {
    const { element } = shallowMount(Component);

    expect(element).toMatchSnapshot();
  });
});
