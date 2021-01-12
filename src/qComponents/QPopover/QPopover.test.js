import Component from './index';

describe('QPopover', () => {
  const options = {
    slots: {
      reference: '<button>Open</button>'
    }
  };

  it('should match snapshot', () => {
    const { element } = shallowMount(Component, options);
    expect(element).toMatchSnapshot();
  });

  it('data should match snapshot', () => {
    expect(Component.data()).toMatchSnapshot();
  });

  describe('computed', () => {
    describe('popoverClasses', () => {
      it('should return expected value if icon does not exist', () => {
        const instance = shallowMount(Component, options);
        instance.setProps({
          icon: ''
        });
        const expected = {
          'q-popover_without-icon': true
        };
        expect(instance.vm.popoverClasses).toEqual(expected);
      });

      it('should return expected value if icon exists', () => {
        const instance = shallowMount(Component, options);
        instance.setProps({
          icon: 'icon-name'
        });
        const expected = {
          'q-popover_without-icon': false
        };
        expect(instance.vm.popoverClasses).toEqual(expected);
      });
    });
  });

  describe('methods', () => {
    describe('togglePopover', () => {
      it('should set isPopoverShown to false', () => {
        const instance = shallowMount(Component, options);
        instance.setData({
          isPopoverShown: true
        });
        instance.vm.togglePopover();
        expect(instance.vm.isPopoverShown).toBeFalsy();
      });

      it('should set isPopoverShown to true', () => {
        const instance = shallowMount(Component, options);
        instance.setData({
          isPopoverShown: false
        });
        instance.vm.togglePopover();
        expect(instance.vm.isPopoverShown).toBeTruthy();
      });
    });

    describe('destroy', () => {
      it('should set isPopoverShown to false', () => {
        const instance = shallowMount(Component, options);
        instance.setData({
          isPopoverShown: true
        });
        instance.vm.destroy();
        expect(instance.vm.isPopoverShown).toBeFalsy();
      });

      it('should call destroy', () => {
        const instance = shallowMount(Component, options);
        const spy = jest.fn(() => {});
        instance.setData({
          popperJS: {
            destroy: spy
          }
        });
        instance.vm.destroy();
        expect(spy).toBeCalled();
      });

      it('should set popperJS to null', () => {
        const instance = shallowMount(Component, options);
        instance.setData({
          popperJS: {
            destroy: () => {}
          }
        });
        instance.vm.destroy();
        expect(instance.vm.popperJS).toBeNull();
      });
    });
  });
});
