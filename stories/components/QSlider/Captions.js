const CaptionsStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes).filter(val => val !== 'value'),

  data() {
    return {
      value: 20
    };
  },

  template: `
    <q-slider 
      v-bind="$props" 
      v-model="value"
    />
  `
});

CaptionsStory.args = {
  showSteps: true,
  step: 20,
  captions: {
    0: '0',
    20: '20%',
    40: '40%',
    60: '60%',
    80: '80%',
    100: '100%'
  }
};

export default CaptionsStory;
