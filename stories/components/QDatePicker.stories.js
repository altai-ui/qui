import { addMonths, subMonths } from 'date-fns';
import QDatePicker from '../../src/qComponents/QDatePicker';

export default {
  title: 'Components/QDatePicker',
  component: QDatePicker,
  argTypes: {
    'v-model': { control: { type: 'none' } },
    disabledValues: {
      control: {
        type: 'select',
        options: [
          null,
          {
            to: subMonths(new Date(), 2),
            ranges: [
              { start: new Date(), end: new Date(addMonths(new Date(), 1)) }
            ]
          }
        ]
      }
    },
    outputFormat: {
      control: {
        type: 'select',
        options: ['date', 'iso']
      }
    },
    shortcuts: {
      control: {
        type: 'select',
        options: [
          [],
          [
            {
              text: 'Сегодня',
              onClick(picker) {
                picker.$emit('pick', new Date());
              }
            },
            {
              text: 'Вчера',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date);
              }
            },
            {
              text: 'Неделю назад',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
              }
            }
          ]
        ]
      }
    },
    placeholder: {
      type: { name: 'string', required: false }
    },
    format: {
      name: 'format',
      type: { name: 'string', required: false }
    },
    type: {
      control: {
        type: 'select',
        options: [
          'date',
          'datetime',
          'week',
          'month',
          'year',
          'daterange',
          'datetimerange',
          'monthrange',
          'yearrange'
        ]
      }
    },
    firstDayOfWeek: {
      control: {
        type: 'select',
        options: [0, 1, 2, 3, 4, 5, 6]
      }
    }
  }
};

export const Default = (_, { argTypes }) => ({
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
        :append-to-body="appendToBody"
      />`
});

Default.storyName = 'Default';
