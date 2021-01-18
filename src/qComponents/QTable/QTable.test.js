import Component from './index';

describe('QTable', () => {
  let options;

  beforeEach(() => {
    options = {
      propsData: {
        groupsOfColumns: [
          {
            columns: [
              {
                key: 'col1',
                value: 'Column 1'
              }
            ]
          },
          {
            columns: [
              {
                key: 'col2',
                value: 'Column 2',
                align: 'right'
              }
            ]
          }
        ],
        rows: [
          {
            col1: 'Col 1 row 1',
            col2: 'Col 2 row 1'
          },
          {
            col1: 'Col 1 row 2',
            col2: 'Col 2 row 2'
          }
        ]
      }
    };
  });

  it('QTable should match snapshot', () => {
    const { element } = shallowMount(Component, options);

    expect(element).toMatchSnapshot();
  });

  describe('computed', () => {
    it('allColumns should return updated columns', () => {
      const { vm } = shallowMount(Component, options);

      expect(vm.allColumns).toEqual([
        {
          align: 'left',
          key: 'col1',
          value: 'Column 1'
        },
        {
          align: 'right',
          key: 'col2',
          value: 'Column 2'
        }
      ]);
    });

    describe('isDraggable', () => {
      it('should return false in default statement', () => {
        const { vm } = shallowMount(Component, options);

        expect(vm.isDraggable).toBeFalsy();
      });

      it('should return true, if some group has draggable prop', () => {
        options.propsData.groupsOfColumns[0].draggable = true;

        const { vm } = shallowMount(Component, options);

        expect(vm.isDraggable).toBeTruthy();
      });
    });

    it('isSeparated should return false if groupsOfColumns blank', () => {
      options.propsData.groupsOfColumns = [];
      const { vm } = shallowMount(Component, options);

      expect(vm.isDraggable).toBeFalsy();
    });

    describe('areAllChecked', () => {
      it('should return false if no selection', () => {
        const { vm } = shallowMount(Component, options);

        expect(vm.areAllChecked).toBeFalsy();
      });

      it('should return false if some selected', () => {
        const instance = shallowMount(Component, options);
        instance.setData({ checkedRows: [0] });

        expect(instance.vm.areAllChecked).toBeFalsy();
      });

      it('should check all if param equal true', () => {
        const instance = shallowMount(Component, options);
        instance.setData({ areAllChecked: true });

        expect(instance.vm.areAllChecked).toBeTruthy();
      });

      it('should uncheck all if param equal false', () => {
        const instance = shallowMount(Component, options);
        instance.setData({ areAllChecked: false });

        expect(instance.vm.areAllChecked).toBeFalsy();
      });
    });

    it('tableClasses should match snapshot', () => {
      const { vm } = shallowMount(Component, options);

      expect(vm.tableClasses).toMatchSnapshot();
    });

    describe('isIndeterminate', () => {
      it('should return false if no selected', () => {
        const { vm } = shallowMount(Component, options);

        expect(vm.isIndeterminate).toBeFalsy();
      });

      it('should return true if some selected', () => {
        const instance = shallowMount(Component, options);
        instance.setData({ checkedRows: [0] });

        expect(instance.vm.isIndeterminate).toBeTruthy();
      });

      it('should return false if all selected', () => {
        const instance = shallowMount(Component, options);
        instance.setData({ checkedRows: [0, 1] });

        expect(instance.vm.isIndeterminate).toBeFalsy();
      });
    });

    describe('isLeftShadowShown', () => {
      it('should be falsy if stickyColumnKey prop falsy', () => {
        const { vm } = shallowMount(Component, options);

        expect(vm.isLeftShadowShown).toBeFalsy();
      });

      it('should return true if stickyColumnKey is true and scrolled', () => {
        options.propsData.stickyColumnKey = 'col1';
        const instance = shallowMount(Component, options);
        instance.setData({ scrolled: 1 });

        expect(instance.vm.isLeftShadowShown).toBeTruthy();
      });

      it('should return false if stickyColumnKey is true and no scrolled', () => {
        options.propsData.stickyColumnKey = 'col1';
        const instance = shallowMount(Component, options);

        expect(instance.vm.isLeftShadowShown).toBeFalsy();
      });
    });

    describe('isRightShadowShown', () => {
      it('should be falsy if stickyColumnKey prop falsy', () => {
        const { vm } = shallowMount(Component, options);

        expect(vm.isRightShadowShown).toBeFalsy();
      });

      it('should return true if stickyColumnKey is true and no tableClass', () => {
        options.propsData.stickyColumnKey = 'col1';
        const instance = shallowMount(Component, options);

        expect(instance.vm.isRightShadowShown).toBeTruthy();
      });

      it('should return false if stickyColumnKey is true and has correctly tableClass', () => {
        options.propsData.stickyColumnKey = 'col1';
        const instance = shallowMount(Component, options);

        instance.vm.$refs.QTable = { offsetWidth: 10 };
        instance.setData({ scrolled: 10 });

        expect(instance.vm.isRightShadowShown).toBeFalsy();
      });
    });

    describe('tableClass', () => {
      it("should return 'scrolled-left' if didn't scrolled", () => {
        const { vm } = shallowMount(Component, options);

        expect(vm.tableClass).toEqual('scrolled-left');
      });

      it("should return 'scrolled-center' if a little bit scrolled", () => {
        const instance = shallowMount(Component, options);
        instance.setData({ scrolled: 1 });

        expect(instance.vm.tableClass).toEqual('scrolled-center');
      });

      it("should return 'scrolled-right' if completely scrolled", () => {
        const instance = shallowMount(Component, options);

        instance.vm.$refs.QTable = { offsetWidth: 10 };

        instance.setData({ scrolled: 10 });

        expect(instance.vm.tableClass).toEqual('scrolled-right');
      });
    });

    it('computedRows should return updated rows', () => {
      const { vm } = shallowMount(Component, options);

      expect(vm.computedRows).toMatchSnapshot();
    });
  });
});
