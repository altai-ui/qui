import { addMonths, subMonths } from 'date-fns';
import { QDatePicker } from '../../src/qComponents';

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
    }
  }
};

export const Default = (_, { argTypes }) => ({
  props: Object.keys(argTypes).filter(
    arg => !['value', 'format'].includes(arg)
  ),
  data() {
    return {
      value: '',
      format: 'dd MMMM yyyy'
    };
  },
  watch: {
    type(value) {
      switch (value) {
        case 'datetime':
          this.format = 'dd MMM yy, HH:mm:ss';
          this.value = '';
          break;
        case 'daterange':
          this.format = 'dd MMM yyyy';
          this.value = [];
          break;
        case 'datetimerange':
          this.format = 'dd MMM yy, HH:mm:ss';
          this.value = [];
          break;
        case 'week':
          this.format = 'wo';
          this.value = '';
          break;
        case 'month':
          this.format = 'LLLL yyyy';
          this.value = '';
          break;
        case 'monthrange':
          this.format = 'LLLL yyyy';
          this.value = [];
          break;
        case 'year':
          this.format = 'yyyy';
          this.value = '';
          break;
        case 'yearrange':
          this.format = 'yyyy';
          this.value = [];
          break;
        default:
          this.format = 'dd MMMM yyyy';
          this.value = '';
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
        :value-format="valueFormat"
        :name="name"
        :disabled="disabled"
        :disabled-values="disabledValues"
        :shortcuts="shortcuts"
        :start-placeholder="startPlaceholder"
        :end-placeholder="endPlaceholder"
        :first-day-of-week="firstDayOfWeek"
        :range-separator="rangeSeparator"
        :validate-event="validateEvent"
      />`
});

Default.storyName = 'Default';
