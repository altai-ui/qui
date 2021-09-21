const WithoutTooltipStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes).filter(val => val !== 'value'),

  data() {
    return {
      value: null
    };
  },

  template: `
    <q-slider 
      v-bind="$props" 
      v-model="value"
    />
  `
});

WithoutTooltipStory.args = {
  showTooltip: false
};

export default WithoutTooltipStory;
