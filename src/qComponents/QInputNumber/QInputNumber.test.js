import Component from './src/QInputNumber';

describe('QInputNumber', () => {
  it('should match snapshot', () => {
    const { element } = shallowMount(Component);

    expect(element).toMatchSnapshot();
  });

  it('should match snapshot without controls', () => {
    const { element } = shallowMount(Component, {
      propsData: {
        controls: false
      }
    });

    expect(element).toMatchSnapshot();
  });

  it('data should match snapshot', () => {
    expect(Component.data()).toMatchSnapshot();
  });

  describe('computed', () => {
    it('increaseClass', () => {
      const instance = shallowMount(Component);

      instance.setData({
        number: '9007199254740992'
      });

      expect(instance.vm.increaseClass).toEqual(
        'q-input-number__button_is-disabled'
      );
    });

    it('decreaseClass', () => {
      const instance = shallowMount(Component);

      instance.setData({
        number: '-9007199254740992'
      });

      expect(instance.vm.decreaseClass).toEqual(
        'q-input-number__button_is-disabled'
      );
    });
  });

  describe('methods', () => {
    it('handleIncreaseClick', () => {
      const { vm } = shallowMount(Component);
      vm.handleIncreaseClick();

      expect(vm.userValue).toEqual(1);
    });

    it('handleDecreaseClick', () => {
      const { vm } = shallowMount(Component);
      vm.handleDecreaseClick();

      expect(vm.userValue).toEqual(-1);
    });
  });
});
