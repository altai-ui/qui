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
  props: Object.keys(argTypes).filter(arg => !['value'].includes(arg)),
  data() {
    return { value: null };
  },
  methods: {
    handleValueChange(value) {
      this.value = value;
    }
  },
  template: `
    <q-cascader
      v-model="value"
      @change="handleValueChange"
      :check-strictly="checkStrictly"
      :options="options"
      :placeholder="placeholder"
      :disabled="disabled"
      :clearable="clearable"
      :multiple="multiple"
      :separator="separator"
      :all-levels-shown="allLevelsShown"
      :collapse-tags="collapseTags"
    />
  `
});

QCascaderStory.storyName = 'Default';
QCascaderStory.args = {
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
              label: 'Consistency',
              children: [
                {
                  value: 'four level',
                  label: 'Four level'
                }
              ]
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
        },
        {
          value: 'alone',
          label: 'Alone'
        }
      ]
    },
    {
      value: 'resource',
      label: 'Resource'
    }
  ]
};
