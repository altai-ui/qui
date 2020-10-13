import { QPopover } from '../../src/qComponents';

import PLACEMENTS from '../../src/qComponents/constants/popperPlacements';

export default {
  title: 'Components/QPopover',
  component: QPopover,
  argTypes: {
    placement: {
      control: { type: 'select', options: PLACEMENTS }
    },
    trigger: {
      control: { type: 'inline-radio', options: ['click', 'hover'] }
    },
    minWidth: { control: { type: 'number' } },
    maxWidth: { control: { type: 'number' } }
  }
};

export const QPopoverStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <q-popover
      v-bind="$props"
    >
      <q-button
        slot="reference"
        circle
        type="icon"
        theme="secondary"
        size="small"
        icon="q-icon-question-mark"
      />

      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </q-popover>
  `
});

QPopoverStory.storyName = 'Default';
QPopoverStory.args = {
  title: 'What is Lorem Ipsum?',
  icon: 'q-icon-question'
};
