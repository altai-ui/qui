import { QTimePicker } from '../../src/qComponents';

export default {
  title: 'Components/QTimePicker',
  component: QTimePicker,
  argTypes: {
    value: { control: { type: 'none' } },
    disabledValues: {
      control: {
        type: 'select',
        options: [
          null,
          {
            to: '03:03:03'
          }
        ]
      }
    }
  }
};

export const Default = (_, { argTypes }) => ({
  props: Object.keys(argTypes).filter(arg => arg !== 'value'),
  components: { QTimePicker },
  data() {
    return {
      value: null
    };
  },
  methods: {
    handleTimeChange(val) {
      this.value = val;
    }
  },
  template: `
      <q-time-picker :clearable="clearable" :disabled="disabled" :disabled-values="disabledValues" @change="handleTimeChange" :value="value" />
  `
});

Default.storyName = 'Default';
