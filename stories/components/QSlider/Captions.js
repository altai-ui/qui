export default (_, { argTypes }) => ({
  props: Object.keys(argTypes).filter(
    val => val !== 'value' && val !== 'captions'
  ),
  data() {
    return {
      value: 20,
      captions: {
        0: '0',
        20: '20%',
        40: '40%',
        60: '60%',
        80: '80%',
        100: '100%'
      }
    };
  },
  template: `
    <q-slider 
      v-bind="$props" 
      v-model="value"
      :captions="captions"
      :step="20"
      show-steps
    />
  `
});
