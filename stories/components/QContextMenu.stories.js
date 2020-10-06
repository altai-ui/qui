import { QContextMenu } from '../../src/qComponents';
import '../../src/qComponents/QContextMenu/src/q-context-menu.scss';

export default {
  title: 'Components/QContextMenu',
  component: QContextMenu,
  argTypes: {
    position: {
      control: { type: 'inline-radio', options: ['left', 'right'] }
    }
  }
};

export const QContextMenuStory = (_, { argTypes }) => ({
  components: { QContextMenu },
  props: Object.keys(argTypes),
  methods: {
    handleAction(action) {
      console.log(action);
    }
  },
  template: `
    <q-context-menu
      v-bind="$props"
      @action="handleAction"
    />
  `
});

QContextMenuStory.storyName = 'Default';
QContextMenuStory.args = {
  menuItems: [
    {
      action: 'action1',
      name: 'Menu item 1',
      icon: 'q-icon-account'
    },
    {
      action: 'action2',
      name: 'Menu item 2',
      icon: 'q-icon-bell'
    },
    {
      action: 'action3',
      name: 'Menu item 3',
      icon: 'q-icon-pic'
    }
  ]
};
