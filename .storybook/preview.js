import { addParameters } from '@storybook/vue';

import '../src/main.scss';
import '../src/fonts/index.scss';
import '../src/icons/index.scss';

addParameters({
  layout: 'centered',
  docs: {
    inlineStories: true
  }
});
