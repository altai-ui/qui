import { QInput } from '../../src/qComponents';

import { iconsList } from '../core/icons.stories.mdx';

export default {
  title: 'Components/QInput',
  component: QInput,
  argTypes: {
    placeholder: { control: { type: 'text' } },
    maxlength: { control: { type: 'number' } },
    value: { control: { type: 'none' } },
    type: {
      control: {
        type: 'select',
        options: ['text', 'password', 'number', 'email', 'hidden', 'tel', 'url']
      }
    },
    suffixIcon: {
      control: {
        type: 'select',
        options: iconsList
      }
    }
  }
};

export const QInputStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      input: ''
    };
  },
  template: '<q-input v-bind="$props" v-model="input" />'
});

QInputStory.storyName = 'Default';
