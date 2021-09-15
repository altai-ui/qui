export default (_, { argTypes }) => ({
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
      :step="10"
      show-steps
    />
  `
});
