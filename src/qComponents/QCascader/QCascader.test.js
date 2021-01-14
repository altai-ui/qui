import Component from './src/QCascader';

describe('QCascader', () => {
  let instance;
  let options;

  beforeEach(() => {
    options = {
      mocks: {
        $t: () => {}
      },
      propsData: {
        value: 'resource',
        placeholder: 'placeholder',
        options: [
          {
            value: 'guide',
            label: 'Guide'
          },
          {
            value: 'resource',
            label: 'Resource'
          }
        ]
      }
    };

    instance = mount(Component, options);
  });

  it('should match snapshot', () => {
    expect(instance.element).toMatchSnapshot();
  });

  describe('computed', () => {
    describe('model', () => {
      it('should set inputValue if has been changed', () => {
        const expected = 'guide';
        instance.vm.model = expected;

        expect(instance.vm.inputValue).toEqual(expected);
      });
    });
    describe('clearBtnVisible', () => {
      it('should return false if showClose is false', () => {
        expect(instance.vm.clearBtnVisible).toBeFalsy();
      });
      it('should return true if showClose is true', () => {
        instance.vm.showClose = true;
        expect(instance.vm.clearBtnVisible).toBeTruthy();
      });
    });
  });

  describe('watch', () => {
    describe('value', () => {
      it('should set checkedValues if value is array', () => {
        const expected = ['guide', 'resource'];
        instance.setProps({
          value: expected
        });
        expect(instance.vm.checkedValues).toEqual(expected);
      });
    });
  });
});
