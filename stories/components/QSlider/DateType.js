import { format } from 'date-fns';

const today = new Date();

const currentYear = today.getFullYear();
const currentMonth = today.getMonth();
const currentDay = today.getDate();

const startDate = new Date(currentYear, currentMonth, currentDay, 9, 0, 0, 0);
const endDate = new Date(currentYear, currentMonth, currentDay, 21, 0, 0, 0);

const DateTypeStory = (_, { argTypes }) => ({
  props: Object.keys(argTypes).filter(val => val !== 'value'),

  data() {
    return {
      value: [startDate, endDate]
    };
  },

  template: `
      <q-slider
          v-bind="$props"
          v-model="value"
      />
    `
});

DateTypeStory.args = {
  min: startDate,
  max: endDate,
  type: 'date',
  range: true,
  step: 1000 * 60 * 30, // 30 minutes
  showSteps: true,
  captionStep: 1000 * 60 * 120, // 2 hour
  formatTooltip(value) {
    if (!value) return null;
    return format(value, 'dd MMM yyyy HH:mm');
  },
  formatCaption(value) {
    if (!value) return null;
    return format(value, 'HH:mm');
  }
};

export default DateTypeStory;
