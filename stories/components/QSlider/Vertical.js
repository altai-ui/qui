const VerticalStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes).filter(val => val !== 'value'),

  data() {
    return {
      value: 30
    };
  },

  template: `
    <q-slider 
      v-bind="$props" 
      v-model="value"
    />
  `
});

VerticalStory.args = {
  vertical: true
};

export default VerticalStory;
