import QRadio from '../../src/qComponents/QRadio';

export default {
  title: 'Components/QRadio/QRadio',
  component: QRadio,
  argTypes: {
    'v-model': { control: { type: 'none' } },
    value: { control: { type: 'none' } },
    label: { control: 'text' }
  }
};

export const QRadioStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      radio1: '1',
      radio2: '1'
    };
  },
  template: `
    <div>
      <q-radio
        v-model="radio1"
        value="1"
        v-bind="$props"
      />
      <br /><br />
      <q-radio
        v-model="radio1"
        value="2"
        label="Option B"
      />
      <br /><br />
      <q-radio
        v-model="radio1"
        value="3"
        label="Option C"
      />
      <br /><br />
      <q-radio
        v-model="radio1"
        disabled
        value="4"
        label="Disabled"
      />
      <br /><br />
      <q-radio
        v-model="radio2"
        disabled
        value="1"
        label="Checked & disabled"
      />
    </div>
  `
});

QRadioStory.storyName = 'Default';
QRadioStory.args = {
  label: 'Option A'
};
