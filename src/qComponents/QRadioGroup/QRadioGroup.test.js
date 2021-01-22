import Component from './src/QRadioGroup';

describe('QRadioGroup', () => {
  it('should match snapshot', () => {
    const { element } = shallowMount(Component);

    expect(element).toMatchSnapshot();
  });
});
