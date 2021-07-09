import QRangeSelector from '../../src/qComponents/QRangeSelector';

export default {
  title: 'Components/QRangeSelector',
  component: QRangeSelector,

  argTypes: {
    value: {
      control: {
        type: 'text'
      }
    },
    min: {
      control: {
        type: 'number'
      }
    },
    max: {
      control: {
        type: 'number'
      }
    }
  }
};

export const Default = (_, { argTypes }) => ({
  props: Object.keys(argTypes).filter(val => val !== 'value'),
  data() {
    return {
      value: [25, 75]
    };
  },
  template: `
    <q-range-selector 
      v-bind="$props" 
      v-model="value"
    />
  `
});

Default.storyName = 'Default';
