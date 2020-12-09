import QInput from '../../src/qComponents/QInput';

import { iconsList } from '../core/icons.stories.mdx';

export default {
  title: 'Components/QInput',

  component: QInput,

  argTypes: {
    placeholder: {
      control: {
        type: 'text'
      }
    },

    maxlength: {
      control: {
        type: 'number'
      }
    },

    value: {
      control: {
        type: 'text'
      }
    },

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
    },

    autocomplete: {
      control: {
        type: 'select',
        options: ['on', 'off']
      }
    }
  }
};

export const QInputStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes).filter(arg => arg !== 'value'),

  data() {
    return {
      value: ''
    };
  },

  template: '<q-input v-bind="$props" v-model="value" />'
});

QInputStory.storyName = 'Default';
