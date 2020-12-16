import QPopover from '../../src/qComponents/QPopover';
import { iconsList } from '../core/icons.stories.mdx';
import PLACEMENTS from '../../src/qComponents/constants/popperPlacements';

export default {
  title: 'Components/QPopover',
  component: QPopover,
  argTypes: {
    trigger: {
      control: {
        type: 'inline-radio',
        options: ['click', 'hover']
      }
    },
    placement: {
      control: {
        type: 'select',
        options: PLACEMENTS
      }
    },
    icon: {
      control: {
        type: 'select',
        options: iconsList
      }
    }
  }
};

export const Default = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      componentKey: 0
    };
  },
  watch: {
    trigger() {
      // trigger is being setting up in mounted, we need to update render
      this.componentKey += 1;
    }
  },
  template: `
    <q-popover v-bind="$props" :key="componentKey">>
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

Default.storyName = 'Default';
Default.args = {
  title: 'What is Lorem Ipsum?',
  icon: 'q-icon-question'
};
