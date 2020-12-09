import QDrawer from '../../src/qComponents/QDrawer';

export default {
  title: 'Components/QDrawer',
  component: QDrawer,
  argTypes: {
    visible: { control: { type: 'none' } },
    width: { control: { type: 'number' } },
    position: {
      control: { type: 'inline-radio', options: ['left', 'right'] }
    }
  }
};

export const QNotificationStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      drawer: false
    };
  },
  template: `
    <div>
      <q-button @click="drawer = true">
        open
      </q-button>
      <q-drawer v-bind="$props" :visible.sync="drawer" >I'm drawer's slot</q-drawer>
    </div>
  `
});

QNotificationStory.storyName = 'Default';
QNotificationStory.args = {
  visible: false,
  appendToBody: false,
  title: 'What is Lorem Ipsum?'
};
