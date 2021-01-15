import Component from './src/QMessageBox.vue';

describe('QMessageBox', () => {
  it('should match snapshot', () => {
    const { element } = shallowMount(Component);
    expect(element).toMatchSnapshot();
  });

  it('data should match snapshot', () => {
    expect(Component.data()).toMatchSnapshot();
  });
});
