export default (_, { argTypes }) => ({
  props: Object.keys(argTypes).filter(
    arg => !['value', 'format'].includes(arg)
  ),
  data() {
    return {
      value: null,
      format: 'dd MMMM yyyy'
    };
  },
  methods: {
    handleRangePickClick(val) {
      console.log('handleRangePickClick', val);
    },
    handleChange(value) {
      console.log('handleChange', value);
    },
    handleInput(value) {
      console.log('handleInput', value);
    }
  },
  watch: {
    type(value) {
      switch (value) {
        case 'datetime':
          this.format = 'dd MMM yy, HH:mm:ss';
          this.value = null;
          break;
        case 'daterange':
          this.format = 'dd MMM yyyy';
          this.value = null;
          break;
        case 'datetimerange':
          this.format = 'dd MMM yy, HH:mm:ss';
          this.value = null;
          break;
        case 'week':
          this.format = 'wo';
          this.value = null;
          break;
        case 'month':
          this.format = 'LLLL yyyy';
          this.value = null;
          break;
        case 'monthrange':
          this.format = 'LLLL yyyy';
          this.value = null;
          break;
        case 'year':
          this.format = 'yyyy';
          this.value = null;
          break;
        case 'yearrange':
          this.format = 'yyyy';
          this.value = null;
          break;
        default:
          this.format = 'dd MMMM yyyy';
          this.value = null;
          break;
      }
    }
  },
  template: `
      <q-date-picker
        v-model="value"
        :clearable="clearable"
        :editable="editable"
        :placeholder="placeholder"
        :type="type"
        :format="format"
        :output-format="outputFormat"
        :name="name"
        :disabled="disabled"
        :disabled-values="disabledValues"
        :shortcuts="shortcuts"
        :start-placeholder="startPlaceholder"
        :end-placeholder="endPlaceholder"
        :first-day-of-week="firstDayOfWeek"
        :range-separator="rangeSeparator"
        :validate-event="validateEvent"
        @rangepick="handleRangePickClick"
        @input="handleInput"
        @change="handleChange"
        :append-to-body="appendToBody"
      />`
});
