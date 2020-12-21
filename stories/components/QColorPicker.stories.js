import QColorPicker from '../../src/qComponents/QColorPicker';

import PLACEMENTS from '../../src/qComponents/constants/popperPlacements';

export default {
  title: 'Components/QColorPicker',
  component: QColorPicker,
  argTypes: {
    'v-model': { control: { type: 'none' } },
    placement: {
      control: { type: 'select', options: PLACEMENTS }
    },
    colorFormat: {
      control: { type: 'select', options: ['hex', 'rgb'] }
    }
  }
};

export const QColorPickerStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      color: '#f25'
    };
  },
  template: `
    <q-color-picker
      v-model="color"
      v-bind="$props"
    />
  `
});

QColorPickerStory.storyName = 'Default';
