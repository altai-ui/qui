import { QTextarea } from '../../src/qComponents';

export default {
  title: 'Components/QTextarea',
  component: QTextarea,
  argTypes: {
    placeholder: { control: { type: 'text' } },
    maxlength: { control: { type: 'number' } },
    value: { control: { type: 'none' } },
    resize: {
      control: {
        type: 'select',
        options: ['vertical', 'horizontal', 'both', 'none']
      }
    }
  }
};

export const QTextareaStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      input: ''
    };
  },
  template: '<q-textarea v-bind="$props" v-model="input" />'
});

QTextareaStory.storyName = 'Default';
