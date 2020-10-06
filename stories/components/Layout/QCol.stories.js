import { QRow, QCol } from '../../../src/qComponents';
import './layout.scss';
import '../../../src/qComponents/QRow/src/q-row.scss';
import '../../../src/qComponents/QCol/src/q-col.scss';

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
  components: { QRow, QCol },
  props: Object.keys(argTypes),
  template: `
    <q-row
      class="demo-row"
    >
      <q-col
        cols="2"
        class="demo-col"
      >2</q-col>
      <q-col
        v-bind="$props"
        class="demo-col"
      >dyn</q-col>
      <q-col
        cols="2"
        class="demo-col"
      >2</q-col>
    </q-row>
  `
});

QColStory.storyName = 'Default';
QColStory.args = {
  cols: 5,
  offset: 3
};
