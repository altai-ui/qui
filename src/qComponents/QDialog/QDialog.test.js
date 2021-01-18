import Component from './src/QDialog.vue';

describe('QDialog', () => {
  it('should match snapshot', async () => {
    const instance = shallowMount(Component, {
      stubs: ['dialog-content']
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
