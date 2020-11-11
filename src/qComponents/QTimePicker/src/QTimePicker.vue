<template>
  <div
    v-click-outside="hidePopper"
    class="q-time-picker"
  >
    <q-input
      ref="reference"
      :value="displayValue"
      class="q-time-picker__input"
      :disabled="isTimePickerDisabled"
      @focus="showPopper"
      @input="handleInput"
      @change="handleChange"
      @mouseenter.native="handleMouseEnter"
      @mouseleave.native="showClose = false"
    >
      <span
        slot="suffix"
        class="q-input__icon"
        :class="iconClass"
        @click="handleClickIcon"
      />
    </q-input>
    <time-panel
      ref="panel"
      :value="parsedTime"
      :disabled-values="disabledValues"
      :visible="Boolean(popper)"
      @change="handleTimeChange"
    />
  </div>
</template>

<script>
import { isDate } from 'date-fns';
import { createPopper } from '@popperjs/core';
import Pickers from '../../mixins/pickers';
import TimePanel from './components/panel';
import { addZero, isTimeValueValid } from '../../helpers/dateHelpers';

export default {
  name: 'QTimePicker',
  componentName: 'QTimePicker',
  components: {
    TimePanel
  },
  inject: {
    qForm: {
      default: null
    },
    qFormItem: {
      default: null
    }
  },
  mixins: [Pickers],
  props: {
    /**
     * date or string '00:00:00'
     */
    value: {
      type: [Date, String],
      default: null,
      validator: isTimeValueValid
    },
    /**
     * whether QTimePicker is disabled
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * whether QTimePicker is clearable
     */
    clearable: {
      type: Boolean,
      default: true
    },
    /**
     * any field is optional:
     * `to` - example string '10:10:10', disable all before this value',
     * `from` - example string '10:10:10', disable after this value,
     */
    disabledValues: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      popper: null,
      showClose: false,
      userInput: null
    };
  },

  computed: {
    isTimePickerDisabled() {
      return this.disabled || this.qForm?.disabled;
    },

    iconClass() {
      const defaultClass = this.isTimePickerDisabled
        ? 'q-icon-lock'
        : 'q-icon-clock-stroke';
      return this.showClose ? 'q-icon-close' : defaultClass;
    },

    parsedTime() {
      if (isDate(this.value)) {
        return {
          hours: addZero(this.value.getHours()),
          minutes: addZero(this.value.getMinutes()),
          seconds: addZero(this.value.getSeconds())
        };
      }

      const timeString = isTimeValueValid(this.value) ? this.value : '';
      if (!timeString) return '';
      const time = timeString.split(':');
      return {
        hours: addZero(time[0]),
        minutes: addZero(time[1]),
        seconds: addZero(time[2])
      };
    },
    displayValue() {
      if (this.userInput !== null) {
        return this.userInput;
      }

      if (this.parsedTime) {
        const { hours, minutes, seconds } = this.parsedTime;
        return `${hours}:${minutes}:${seconds}`;
      }

      return '';
    }
  },
  methods: {
    handleMouseEnter() {
      if (this.disabled) return;
      if (this.clearable && (this.userInput || this.value)) {
        this.showClose = true;
      }
    },
    handleClickIcon() {
      this.showClose = false;
      this.$emit('change', null);
    },

    handleChange() {
      if (this.userInput) {
        if (isTimeValueValid(this.userInput)) {
          this.$emit('change', this.userInput);
        }
      } else {
        this.$emit('change', null);
      }
      this.userInput = null;
    },

    handleTimeChange({ type, value }) {
      const newValue = {
        ...(this.parsedTime
          ? this.parsedTime
          : {
              hours: '00',
              minutes: '00',
              seconds: '00'
            })
      };
      newValue[type] = value;
      const result = `${newValue.hours}:${newValue.minutes}:${newValue.seconds}`;
      this.$emit('change', result);
      this.qFormItem?.validateField('change');
    },

    createPopper() {
      const reference = this.$refs.reference.$el;
      const panel = this.$refs.panel.$el;

      this.popper = createPopper(reference, panel, {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8]
            }
          },
          {
            name: 'flip',
            options: {
              fallbackPlacements: ['top', 'bottom']
            }
          }
        ]
      });
    },

    destroyPopper() {
      if (this.popper) {
        this.popper.destroy();
        this.popper = null;
      }
    },

    showPopper() {
      this.$refs.panel.$el.setAttribute('data-show', '');
      this.createPopper();
    },

    hidePopper() {
      this.$refs.panel.$el.removeAttribute('data-show');
      this.destroyPopper();
    }
  }
};
</script>
