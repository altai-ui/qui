import Component from './src/QMessageBox.vue';

describe('QMessageBox', () => {
  it('should match snapshot', async () => {
    const instance = shallowMount(Component, {
      stubs: ['message-box-content']
    });

    await instance.setData({
      isShown: true
    });

    expect(instance.element).toMatchSnapshot();
  });

  it('data should match snapshot', () => {
    expect(Component.data()).toMatchSnapshot();
  });
});
