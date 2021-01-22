import Component from './src/QTag';

describe('QTag', () => {
  it('should match snapshot', async () => {
    const { element } = shallowMount(Component);
    expect(element).toMatchSnapshot();
  });

  describe('methods', () => {
    describe('handleClose', () => {
      it('should emit close', () => {
        const instance = shallowMount(Component);

        instance.vm.handleClose();

        expect(instance.emitted().close).toBeTruthy();
      });
    });
  });
});
