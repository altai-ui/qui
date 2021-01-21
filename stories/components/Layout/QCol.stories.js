import QRow from '../../../src/qComponents/QRow';
import QCol from '../../../src/qComponents/QCol';
import './layout.scss';

export default {
  title: 'Components/Layout/QCol',
  component: QCol,
  subcomponents: { QRow },
  argTypes: {
    cols: {
      control: {
        type: 'select',
        options: [null, 'auto', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      }
    },
    offset: {
      control: {
        type: 'select',
        options: [null, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      }
    }
  }
};

export const QColStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <div class="demo">
      <q-row class="demo__row">
        <q-col class="demo__col" cols="2">
          <div class="demo__content">2</div>
        </q-col>

        <q-col class="demo__col" v-bind="$props">
          <div class="demo__content">dyn</div>
        </q-col>

        <q-col class="demo__col" cols="2">
          <div class="demo__content">2</div>
        </q-col>
      </q-row>
    </div>
  `
});

QColStory.storyName = 'Default';
QColStory.args = {
  cols: 5,
  offset: 3
};
