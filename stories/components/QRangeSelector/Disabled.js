export default (_, { argTypes }) => ({
  props: Object.keys(argTypes).filter(val => val !== 'value'),

  data() {
    return {
      value: 50
    };
  },

  template: `
    <q-range-selector 
      v-bind="$props" 
      v-model="value"
      disabled
    />
  `
});
