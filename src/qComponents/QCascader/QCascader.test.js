import Component from './src/QCascader';

const module = require('../helpers');

module.randId = jest.fn();

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
            label: 'Guide',
            children: [
              {
                value: 'child',
                label: 'Child',
                children: [{ value: 'next child', label: 'Next child' }]
              }
            ]
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
    const spy = prefix => `${prefix}000`;
    module.randId.mockImplementation(spy);
    instance = mount(Component, options);
    expect(instance.element).toMatchSnapshot();
  });

  it('data should match snapshot', () => {
    expect(Component.data()).toMatchSnapshot();
  });

  describe('computed', () => {
    describe('model', () => {
      it('should set inputValue if has been changed', () => {
        const expected = 'guide';
        instance.vm.model = expected;

        expect(instance.vm.inputValue).toEqual(expected);
      });
    });
    describe('isClearBtnVisible', () => {
      it('should return false if showClose is false', async () => {
        await instance.setData({
          showClose: false
        });
        expect(instance.vm.isClearBtnVisible).toBeFalsy();
      });
      it('should return true if showClose is true', async () => {
        await instance.setData({
          showClose: true
        });
        expect(instance.vm.isClearBtnVisible).toBeTruthy();
      });
    });
  });

  describe('watch', () => {
    describe('value', () => {
      it('should set checkedValues if value is array', async () => {
        const expected = ['guide', 'child'];
        await instance.setProps({
          value: expected
        });
        expect(instance.vm.checkedValues).toEqual(expected);
      });
    });
  });
});
