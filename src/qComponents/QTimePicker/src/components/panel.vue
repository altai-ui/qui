<template>
  <div class="time-panel">
    <div class="time-panel__common">
      {{ fullTime }}
    </div>
    <div class="time-panel__pickers">
      <div class="time-panel__hours">
        <div class="time-panel__sign">час</div>
        <div class="time-panel__scrollbar">
          <q-scrollbar :scroll-to="hoursElement">
            <button
              v-for="hour in hours"
              :key="hour"
              class="cell cell_hours"
              :disabled="getDisabled({ type: 'hours', value: hour })"
              :class="getClasses({ type: 'hours', value: hour })"
              @click="$emit('change', { type: 'hours', value: hour })"
            >
              {{ hour }}
            </button>
          </q-scrollbar>
        </div>
      </div>
      <div class="time-panel__minutes">
        <div class="time-panel__scrollbar">
          <div class="time-panel__sign">мин</div>
          <q-scrollbar :scroll-to="minutesElement">
            <button
              v-for="minute in minutes"
              :key="minute"
              class="cell cell_minutes"
              :disabled="getDisabled({ type: 'minutes', value: minute })"
              :class="getClasses({ type: 'minutes', value: minute })"
              @click="$emit('change', { type: 'minutes', value: minute })"
            >
              {{ minute }}
            </button>
          </q-scrollbar>
        </div>
      </div>
      <div class="time-panel__seconds">
        <div class="time-panel__scrollbar">
          <div class="time-panel__sign">сек</div>
          <q-scrollbar :scroll-to="secondsElement">
            <button
              v-for="second in seconds"
              :key="second"
              class="cell cell_seconds"
              :class="getClasses({ type: 'seconds', value: second })"
              :disabled="getDisabled({ type: 'seconds', value: second })"
              @click="$emit('change', { type: 'seconds', value: second })"
            >
              {{ second }}
            </button>
          </q-scrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isString } from 'lodash-es';
import { addZero, isTimeValueValid } from '../../../helpers/dateHelpers';

const calcValuesWithGap = gap => {
  const values = [];
  [...Array(60).keys()].forEach(value => {
    if (value % gap === 0) {
      values.push(addZero(value));
    }
  });

  return values;
};

const findElement = (target, querySelector, value) => {
  const elements = target.querySelectorAll(querySelector);
  const elementsArray = Array.prototype.slice.call(elements);
  const element = elementsArray.find(cell => cell.innerText === value);

  return element;
};

export default {
  name: 'TimePanel',
  props: {
    disabledValues: {
      type: Object,
      default: () => ({ to: null, from: null, ranges: null })
    },
    visible: {
      type: Boolean,
      default: false
    },
    prefixToTime: {
      type: String,
      default: ''
    },
    minutesGap: {
      type: [String, Number],
      default: 1
    },
    secondsGap: {
      type: [String, Number],
      default: 1
    },
    value: {
      type: [Object, String],
      default: () => ({
        hours: '00',
        minutes: '00',
        seconds: '00'
      })
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      hoursElement: null,
      minutesElement: null,
      secondsElement: null
    };
  },

  computed: {
    hours() {
      return [...Array(24).keys()].map(hour => addZero(hour));
    },
    minutes() {
      return calcValuesWithGap(this.minutesGap);
    },
    seconds() {
      return calcValuesWithGap(this.secondsGap);
    },
    fullTime() {
      const time = this.value
        ? `${this.value.hours}:${this.value.minutes}:${this.value.seconds}`
        : '__:__:__';

      return this.prefixToTime ? `${this.prefixToTime} ${time}` : time;
    }
  },

  watch: {
    value(value) {
      this.scrollToPickedElements(value);
    },
    visible(isVisible) {
      if (isVisible) this.scrollToPickedElements(this.value);
    }
  },

  methods: {
    scrollToPickedElements(value) {
      if (!value) return;
      this.hoursElement = findElement(this.$el, '.cell_hours', value.hours);
      this.minutesElement = findElement(
        this.$el,
        '.cell_minutes',
        value.minutes
      );
      this.secondsElement = findElement(
        this.$el,
        '.cell_seconds',
        value.seconds
      );
    },
    getDisabled({ type, value }) {
      if (this.disabled) return true;
      let disabled = false;
      const to = this.disabledValues?.to;
      const from = this.disabledValues?.from;

      if (to || from) {
        const [toHours, toMinutes, toSeconds] =
          isString(to) && isTimeValueValid(to) ? to.split(':') : [];
        const [fromHours, fromMinutes, fromSeconds] =
          isString(to) && isTimeValueValid(from) ? from.split(':') : [];
        switch (type) {
          default:
            disabled = false;
            break;
          case 'hours':
            disabled =
              (toHours && Number(value) < toHours) ||
              (fromHours && Number(value) > fromHours);
            break;
          case 'minutes':
            disabled =
              (toMinutes && Number(value) < toMinutes) ||
              (fromMinutes && Number(value) > fromMinutes);
            break;
          case 'seconds':
            disabled =
              (toSeconds && Number(value) < toSeconds) ||
              (fromSeconds && Number(value) > fromSeconds);
            break;
        }
      }

      return disabled;
    },
    getClasses({ type, value }) {
      return { cell_current: this.value?.[type] === value };
    }
  }
};
</script>
