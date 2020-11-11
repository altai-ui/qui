<template>
  <div v-click-outside="handleClose">
    <q-input
      v-if="!ranged"
      ref="reference"
      class="q-date-editor"
      :readonly="!editable"
      :disabled="pickerDisabled"
      :name="name"
      :placeholder="placeholder"
      :value="displayValue"
      @focus="handleFocus"
      @keydown.native="handleKeydown"
      @input="handleInput"
      @change="handleChange"
      @mouseenter.native="handleMouseEnter"
      @mouseleave.native="showClose = false"
    >
      <span
        slot="suffix"
        class="q-input__icon"
        :class="iconClass"
        @click="handleIconClick"
      />
    </q-input>
    <div
      v-else
      ref="reference"
      :class="rangeClasses"
      @click="handleRangeClick"
      @mouseenter="handleMouseEnter"
      @mouseleave="showClose = false"
      @keydown="handleKeydown"
    >
      <input
        autocomplete="off"
        class="q-range-input"
        :placeholder="startPlaceholder"
        :value="displayValue && displayValue[0]"
        :disabled="pickerDisabled"
        :name="name && name[0]"
        readonly
        @focus="handleFocus"
      />
      <slot name="range-separator">
        <span class="q-range-separator">{{ rangeSeparator }}</span>
      </slot>
      <input
        autocomplete="off"
        :placeholder="endPlaceholder"
        :value="displayValue && displayValue[1]"
        :disabled="pickerDisabled"
        :name="name && name[1]"
        class="q-range-input"
        readonly
        @focus="handleFocus"
      />
      <span
        :class="iconClass"
        class="q-input__icon"
        @click="handleIconClick"
      />
    </div>
    <component
      :is="panelComponent"
      ref="panel"
      :class="{ 'q-picker-panel_shown': Boolean(popper) }"
      :visible="Boolean(popper)"
      :type="type"
      :shortcuts="shortcuts"
      :disabled-values="disabledValues"
      :first-day-of-week="firstDayOfWeek"
      :value="value"
      :show-time="timepicker"
      @pick="handlePickClick"
    >
      <slot
        v-if="$slots.sidebar"
        :slot="$slots.sidebar"
        name="sidebar"
      />
    </component>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core';
import { isEqual, isString } from 'lodash-es';
import {
  isDate,
  isValid,
  parse,
  startOfMonth,
  startOfWeek,
  startOfYear
} from 'date-fns';
import { formatLocalDate } from './helpers';
import Emitter from '../../mixins/emitter';
import Pickers from '../../mixins/pickers';

import DatePanel from './panel/date';
import DateRangePanel from './panel/date-range';
import MonthRangePanel from './panel/month-range';
import YearRangePanel from './panel/year-range';

const validator = function(val) {
  // either: String, Array of String, null / undefined
  return (
    val === null ||
    val === undefined ||
    isString(val) ||
    (Array.isArray(val) && val.length === 2 && val.every(isString))
  );
};

export default {
  name: 'QDatePicker',
  componentName: 'QDatePicker',
  mixins: [Emitter, Pickers],

  inject: {
    qForm: {
      default: null
    },
    qFormItem: {
      default: null
    }
  },

  props: {
    /**
     * one of sugested types
     */
    type: {
      type: String,
      default: 'date',
      validator: value =>
        [
          'date',
          'datetime',
          'week',
          'month',
          'year',
          'daterange',
          'datetimerange',
          'monthrange',
          'yearrange'
        ].includes(value)
    },
    /**
     * any format from date-fns https://date-fns.org/v2.16.1/docs/format
     */
    format: { type: String, default: 'dd MMMM yyyy' },
    /**
     * returned value, any format from date-fns https://date-fns.org/v2.16.1/docs/format
     */
    valueFormat: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    /**
     * only for ranged types
     */
    startPlaceholder: { type: String, default: 'Дата начала' },
    /**
     * only for ranged types
     */
    endPlaceholder: { type: String, default: 'Дата окончания' },
    /**
     * start with monday by default
     */
    firstDayOfWeek: {
      default: 1,
      type: Number,
      validator: val => val >= 0 && val <= 6
    },
    /**
     * as native name for input
     */
    name: {
      default: '',
      validator
    },
    /**
     * whether QDatePicker is disabled
     */
    disabled: { type: Boolean, default: false },
    /**
     * whether DatePicker is clearable
     */
    clearable: {
      type: Boolean,
      default: true
    },
    /**
     * whether DatePicker is editable, for type is `date` only
     */
    editable: {
      type: Boolean,
      default: true
    },
    /**
     * type Date or array for ranges
     */
    value: {
      type: [String, Array, Date],
      default: ''
    },
    /**
     * separator in the middle of the range
     */
    rangeSeparator: {
      type: String,
      default: '-'
    },
    /**
     * type of each Object is { text: 'example', onClick(picker) }
     */
    shortcuts: { type: Array, default: () => [] },
    /**
     * any field is optional:
     * `to` - disable all before this date,
     * `from` - disable after this date,
     * `ranges` - array of dateranges, each daterange is object and must has `start` and `end` field
     */
    disabledValues: {
      type: Object,
      default: () => ({})
    },
    /**
     * whether to trigger form validation
     */
    validateEvent: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      pickerVisible: false,
      showClose: false,
      userInput: null,
      unwatchPickerOptions: null,
      popper: null
    };
  },

  computed: {
    rangeClasses() {
      return {
        'q-date-editor': true,
        'q-range-editor': true,
        'q-range-editor_disabled': this.pickerDisabled
      };
    },
    iconClass() {
      const calendarIcon = this.timepicker
        ? 'q-icon-calendar-clock'
        : 'q-icon-calendar';
      return this.showClose ? 'q-icon-close' : calendarIcon;
    },

    panelComponent() {
      switch (this.type) {
        case 'daterange':
        case 'datetimerange':
          return DateRangePanel;
        case 'monthrange':
          return MonthRangePanel;
        case 'yearrange':
          return YearRangePanel;
        default:
          return DatePanel;
      }
    },

    ranged() {
      return this.type.includes('range');
    },

    timepicker() {
      return this.type.includes('time');
    },

    isValueEmpty() {
      if (Array.isArray(this.value)) {
        return !this.value.length;
      }

      return !this.value;
    },

    displayValue() {
      let formattedValue = '';

      if (Array.isArray(this.value)) {
        formattedValue = this.value.map(dateFromArray =>
          formatLocalDate(dateFromArray, this.format)
        );
      } else if (isDate(this.value) && isValid(this.value)) {
        formattedValue = formatLocalDate(this.value, this.format);
      }

      if (Array.isArray(this.userInput)) {
        return [
          this.userInput[0] ?? formattedValue?.[0] ?? '',
          this.userInput[1] ?? formattedValue?.[1] ?? ''
        ];
      }
      if (this.userInput !== null) {
        return this.userInput;
      }
      if (formattedValue) {
        return formattedValue;
      }

      return '';
    },

    pickerDisabled() {
      return this.disabled || this.qForm?.disabled;
    }
  },

  watch: {
    pickerVisible(val) {
      if (this.pickerDisabled) return;
      if (val) {
        this.createPopper();
      } else {
        this.destroyPopper();
        this.emitChange(this.value);
        this.userInput = null;
        if (this.validateEvent) {
          this.qFormItem?.validateField('blur');
        }
      }
    },

    value() {
      if (!this.pickerVisible && this.validateEvent) {
        this.qFormItem?.validateField('change');
      }
    }
  },

  methods: {
    handlePickClick(val, { hidePicker = true } = {}) {
      this.pickerVisible = !hidePicker;
      this.emitChange(val);
      this.emitInput(val);
    },

    createPopper() {
      if (this.appendToBody) {
        document.body.appendChild(this.$refs.panel.$el);
        this.$refs.panel.$el.style.width = `${this.$refs.reference.$el.clientWidth}px`;
      }

      const reference =
        this.$refs.reference instanceof Element
          ? this.$refs.reference
          : this.$refs.reference.$el;
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

    focus() {
      if (!this.ranged) {
        this.$refs.reference.focus();
      } else {
        this.handleFocus();
      }
    },

    formatToValue(date) {
      const isFormattable =
        isDate(date) || (Array.isArray(date) && date.every(isDate));
      if (this.valueFormat && isFormattable) {
        return formatLocalDate(date, this.valueFormat);
      }
      return date;
    },

    handleMouseEnter() {
      if (this.pickerDisabled) return;
      if (!this.isValueEmpty && this.clearable) {
        this.showClose = true;
      }
    },

    handleChange() {
      let value;
      let format;
      const date = this.userInput;
      if (date) {
        format = date.length === 10 ? 'dd.MM.yyyy' : 'dd.MM.yy';
        if (this.timepicker && date.length > 10) {
          format = "dd.MM.yyyy', 'HH:mm:ss";
        }
        value = parse(date, format, new Date());

        if (!Number.isNaN(Number(value))) {
          let resultValue = value;
          switch (this.type) {
            case 'week':
              resultValue = startOfWeek(value, { weekStartsOn: 1 });
              break;
            case 'month':
              resultValue = startOfMonth(value);
              break;
            case 'year':
              resultValue = startOfYear(value);
              break;
            default:
              resultValue = value;
              break;
          }
          this.emitInput(resultValue);
        }
      } else {
        this.emitInput(null);
        this.emitChange(null);
      }
      this.userInput = null;
    },

    handleIconClick(event) {
      if (this.pickerDisabled) return;
      if (this.showClose) {
        event.stopPropagation();
        this.emitInput(null);
        this.emitChange(null);
        this.showClose = false;
      } else {
        this.pickerVisible = !this.pickerVisible;
      }
    },

    handleClose() {
      if (!this.pickerVisible) return;
      this.pickerVisible = false;
    },

    handleFocus() {
      this.pickerVisible = true;
      this.$emit('focus', this);
      if (!isDate(this.value) || Array.isArray(this.value)) return;
      const format = this.timepicker ? 'dd.MM.yyyy, HH:mm:ss' : 'dd.MM.yy';
      this.userInput = formatLocalDate(this.value, format);
    },

    handleKeydown(event) {
      const keyCode = event.keyCode;

      // ESC
      if (keyCode === 27) {
        this.pickerVisible = false;
        event.stopPropagation();
        return;
      }

      // Tab
      if (keyCode === 9) {
        if (!this.ranged) {
          this.handleChange();
          this.pickerVisible = false;
          event.stopPropagation();
        } else {
          // user may change focus between two input
          setTimeout(() => {
            this.pickerVisible = false;
            event.stopPropagation();
          }, 0);
        }
        return;
      }

      // if user is typing, do not let picker handle key input
      if (this.userInput) {
        event.stopPropagation();
      }
    },

    handleRangeClick() {
      this.pickerVisible = true;
      this.$emit('focus', this);
    },

    emitChange(val) {
      if (val) {
        this.$emit('change', val);
        if (this.validateEvent) {
          this.qFormItem?.validateField('change');
        }
      }
    },

    emitInput(val) {
      const formatted = this.formatToValue(val);
      if (!isEqual(this.value, formatted)) {
        this.$emit('input', formatted);
      }
    }
  }
};
</script>
