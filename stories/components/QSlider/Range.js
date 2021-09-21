const RangeStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes).filter(val => val !== 'value'),

  data() {
    return {
      value: [20, 80]
    };
  },

  template: `
    <q-slider 
      v-bind="$props" 
      v-model="value"
    />
  `
});

RangeStory.args = {
  range: true
};

export default RangeStory;
