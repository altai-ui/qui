import { shallowMount } from '@vue/test-utils';
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
});
