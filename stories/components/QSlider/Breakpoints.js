export const BreakpointsStory = (_, { argTypes }) => ({
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

BreakpointsStory.args = {
  showSteps: true,
  step: 10
};

export default BreakpointsStory;
