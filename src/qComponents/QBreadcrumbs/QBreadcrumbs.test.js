import Component from './src/QBreadcrumbs';

describe('QBreadcrumbs', () => {
  let instance;
  let options;

  beforeEach(() => {
    options = {
      mocks: {
        $route: { matched: [{ meta: 'one' }] }
      }
    };

    instance = shallowMount(Component, options);
  });

  it('should match snapshot', () => {
    expect(instance.element).toMatchSnapshot();
  });

  describe('computed', () => {
    it('lastCrumb should return custom last crumb if it has been passed', () => {
      const expected = 'one';
      instance.setProps({
        last: expected
      });

      expect(instance.vm.lastCrumb).toEqual(expected);
    });
  });

  describe('pushTo', () => {
    it(`should return the router's 'name' if it has been passed`, () => {
      const route = { name: 'R_MAIN', path: '/main' };
      const expected = { name: route.name };
      expect(instance.vm.pushTo(route)).toEqual(expected);
    });

    it(`should return the router's 'path' if the 'name' hasn't been passed`, () => {
      const route = { path: '/main' };
      const expected = route.path;
      expect(instance.vm.pushTo(route)).toEqual(expected);
    });
  });
});
