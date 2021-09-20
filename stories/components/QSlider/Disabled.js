const DisabledStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes).filter(val => val !== 'value'),

  data() {
    return {
      value: 50
    };
  },

  template: `
    <q-slider 
      v-bind="$props" 
      v-model="value"
    />
  `
});

DisabledStory.args = {
  disabled: true
};

export default DisabledStory;
