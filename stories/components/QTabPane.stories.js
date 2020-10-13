import { QTabs, QTabPane } from '../../src/qComponents';

export default {
  title: 'Components/QTabs/QTabPane',
  component: QTabPane,
  subcomponents: { QTabs },
  argTypes: { width: { control: { type: 'number' } } }
};

export const QTabPaneStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes),
  data() {
    return {
      activeTab: 'first_tab'
    };
  },
  template: `
    <q-tabs v-model="activeTab">
      <q-tab-pane v-bind="$props" />
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

QTabPaneStory.storyName = 'Default';
QTabPaneStory.args = {
  name: 'first_tab',
  title: 'First tab',
  description:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry.'
};
