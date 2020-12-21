import QInputNumber from '../../src/qComponents/QInputNumber';

export default {
  title: 'Components/QInputNumber',
  component: QInputNumber,
  argTypes: {
    value: {
      control: {
        type: 'none'
      }
    }
  }
};

export const Default = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      value: ''
    };
  },
  template: '<q-input-number v-bind="$props" v-model="value" />'
});

Default.storyName = 'Default';
Default.args = { value: 17 };
