import { QCheckbox } from '../../src/qComponents';
import '../../src/qComponents/QCheckbox/src/q-checkbox.scss';

export default {
  title: 'Components/QCheckbox/QCheckbox',
  component: QCheckbox,
  argTypes: {
    'v-model': { control: { type: 'none' } },
    value: { control: { type: 'none' } }
  }
};

export const QCheckboxStory = (_, { argTypes }) => ({
  components: { QCheckbox },
  props: Object.keys(argTypes),
  data() {
    return {
      checked1: true,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: true
    };
  },
  template: `
    <div>
      <q-checkbox v-model="checked1" v-bind="$props" />
      <br /><br />
      <q-checkbox v-model="checked2" label="Вариант B" />
      <br /><br />
      <q-checkbox v-model="checked3" label="Option C" />
      <br /><br />
      <q-checkbox
        v-model="checked4"
        label="Неактивный вариант"
        disabled
      />
      <br /><br />
      <q-checkbox
        v-model="checked5"
        label="Выбранный и неактивный вариант"
        disabled
      />
    </div>
  `
});

QCheckboxStory.storyName = 'Default';
QCheckboxStory.args = {
  label: 'Option A'
};
