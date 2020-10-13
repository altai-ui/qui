import { QCascader, QCascaderPanel } from '../../src/qComponents';

export default {
  title: 'Components/QCascader',
  component: QCascader,
  subcomponents: { QCascaderPanel },
  argTypes: {
    value: { control: { type: 'none' } }
  }
};

export const QCascaderStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes).filter(arg => arg !== 'value'),
  data() {
    return { value: null };
  },
  template: `
    <q-cascader
      v-model="value"
      v-bind="$props"
    />
  `
});

QCascaderStory.storyName = 'Default';
QCascaderStory.args = {
  props: {
    multiple: true,
    noDataText: 'Custom No data'
  },
  options: [
    {
      value: 'guide',
      label: 'Guide',
      children: [
        {
          value: 'disciplines',
          label: 'Disciplines',
          children: [
            {
              value: 'consistency',
              label: 'Consistency'
            },
            {
              value: 'feedback',
              label: 'Feedback'
            }
          ]
        },
        {
          value: 'navigation',
          label: 'Navigation',
          children: [
            {
              value: 'side nav',
              label: 'Side Navigation'
            },
            {
              value: 'top nav',
              label: 'Top Navigation'
            }
          ]
        }
      ]
    },
    {
      value: 'resource',
      label: 'Resource'
    }
  ]
};
