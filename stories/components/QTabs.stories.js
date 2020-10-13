import { QTabs, QTabPane } from '../../src/qComponents';

export default {
  title: 'Components/QTabs/QTabs',
  component: QTabs,
  subcomponents: { QTabPane },
  argTypes: {
    'v-model': { control: { type: 'none' } },
    tabWidth: { control: { type: 'number' } }
  }
};

export const QTabsStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      activeTab: 'first_tab'
    };
  },
  template: `
    <q-tabs
      v-model="activeTab"
      v-bind="$props"
    >
      <q-tab-pane
        name="first_tab"
        title="First tab"
      />
      <q-tab-pane
        name="second_tab"
        title="Second tab"
      />
      <q-tab-pane
        name="third_tab"
        title="Third tab"
      />
    </q-tabs>
  `
});

QTabsStory.storyName = 'Default';
