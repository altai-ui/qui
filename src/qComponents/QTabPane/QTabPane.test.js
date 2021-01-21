import Component from './src/QTabPane';

describe('QTabPane', () => {
  it('should match snapshot', async () => {
    const instance = shallowMount(Component, {
      propsData: {
        name: 'pane_name',
        title: 'Pane Title'
      }
    });

    expect(instance.element).toMatchSnapshot();
  });
});
