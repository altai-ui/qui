import QCol from '../../../src/qComponents/QCol';
import QRow from '../../../src/qComponents/QRow';
import './layout.scss';

export default {
  title: 'Components/Layout/QRow',
  component: QRow,
  subcomponents: { QCol },
  argTypes: {
    alignV: {
      control: {
        type: 'select',
        options: [null, 'start', 'end', 'center', 'baseline', 'stretch']
      }
    },
    alignH: {
      control: {
        type: 'select',
        options: [null, 'start', 'end', 'center', 'between', 'around']
      }
    }
  }
};

export const QRowStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  template: `
    <div class="demo">
      <q-row class="demo__row" v-bind="$props">
        <q-col class="demo-col" cols="2">
          <div class="demo__content">2</div>
        </q-col>

        <q-col class="demo__col" cols="4">
          <div class="demo__content" style="height: 25px;">4</div>
        </q-col>

        <q-col class="demo__col" cols="2">
          <div class="demo__content">2</div>
        </q-col>
      </q-row>
    </div>
  `
});

QRowStory.storyName = 'Default';
