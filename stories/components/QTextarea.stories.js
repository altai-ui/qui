import QTextarea from '../../src/qComponents/QTextarea';

export default {
  title: 'Components/QTextarea',
  component: QTextarea,
  argTypes: {
    placeholder: {
      control: { type: 'text' }
    },
    maxlength: {
      control: {
        type: 'number'
      }
    },
    value: {
      control: {
        type: 'none'
      }
    },
    resize: {
      control: {
        type: 'select',
        options: ['vertical', 'horizontal', 'both', 'none']
      }
    }
  }
};

export const Default = (_, { argTypes }) => ({
  props: Object.keys(argTypes).filter(arg => arg !== 'input'),
  data() {
    return {
      input: ''
    };
  },
  template: `
    <q-textarea
      v-model="input"
      :disabled="disabled"
      :resize="resize"
      :autosize="autosize"
      :placeholder="placeholder"
    />
  `
});

Default.storyName = 'Default';
