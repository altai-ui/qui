import Component from './src/QRow';

describe('QRow', () => {
  it('should match snapshot', async () => {
    const { element } = shallowMount(Component);

    expect(element).toMatchSnapshot();
  });
});
