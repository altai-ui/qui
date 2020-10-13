import { QRadio, QRadioGroup } from '../../src/qComponents';

export default {
  title: 'Components/QRadio/QRadioGroup',
  component: QRadioGroup,
  subcomponents: { QRadio },
  argTypes: {
    'v-model': { control: { type: 'none' } },
    direction: {
      control: { type: 'inline-radio', options: ['vertical', 'horizontal'] }
    }
  }
};

export const QRadioGroupStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return { value: 3 };
  },
  template: `
    <q-radio-group
      v-model="value"
      v-bind="$props"
    >
      <q-radio :value="3" label="Option A" />
      <q-radio :value="6" label="Option B" />
      <q-radio :value="9" label="Option C" />
    </q-radio-group>
  `
});

QRadioGroupStory.storyName = 'Default';
