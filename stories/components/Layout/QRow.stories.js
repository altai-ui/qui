import { QRow, QCol } from '../../../src/qComponents';
import './layout.scss';
import '../../../src/qComponents/QRow/src/q-row.scss';
import '../../../src/qComponents/QCol/src/q-col.scss';

export default {
  title: 'Components/Layout/QRow',
  component: QRow,
  subcomponents: { QCol },
  argTypes: {
    alignV: {
      control: {
        type: 'select',
        options: ['start', 'end', 'center', 'baseline', 'stretch']
      }
    },
    alignH: {
      control: {
        type: 'select',
        options: ['start', 'end', 'center', 'between', 'around']
      }
    }
  }
};

export const QRowStory = (_, { argTypes }) => ({
  components: { QRow, QCol },
  props: Object.keys(argTypes),
  template: `
    <q-row
      v-bind="$props"
      class="demo-row"
    >
      <q-col
        cols="2"
        class="demo-col"
      >2</q-col>
      <q-col
        cols="4"
        class="demo-col"
      >4</q-col>
      <q-col
        cols="2"
        class="demo-col"
      >2</q-col>
    </q-row>
  `
});

QRowStory.storyName = 'Default';
