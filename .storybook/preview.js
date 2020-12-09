import Vue from 'vue';
import { addParameters } from '@storybook/vue';

import Qui from '../src/qComponents';
import theme from './theme';

Vue.use(Qui, {
  localization: {
    locale: 'en'
  }
});

addParameters({
  layout: 'centered',
  controls: { expanded: true },
  options: {
    theme
  },
  docs: {
    inlineStories: true
  }
});
