export default (_, { argTypes }) => ({
  props: Object.keys(argTypes).filter(
    val => val !== 'value' && val !== 'captions'
  ),
  data() {
    return {
      value: [25, 75],
      captions: {
        10: '>10<',
        25: '!25!',
        60: '45+15',
        100: 'max'
      }
    };
  },
  template: `
    <q-range-selector 
      v-bind="$props" 
      v-model="value"
      :min="10"
      :captions="captions"
    />
  `
});
