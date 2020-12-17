<template>
  <div v-click-outside="handleClose">
    <q-input
      v-if="!ranged"
      ref="reference"
      class="q-date-editor"
      :readonly="!editable"
      :disabled="pickerDisabled"
      :name="name"
      :placeholder="placeholder || $t('QDatePicker.placeholder')"
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
        :placeholder="startPlaceholder || $t('QDatePicker.startPlaceholder')"
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
        :placeholder="endPlaceholder || $t('QDatePicker.endPlaceholder')"
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
      :first-day-of-week="calcFirstDayOfWeek"
      :value="transformedValue"
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
  formatISO,
  isDate,
  isValid,
  parse,
  startOfMonth,
  startOfWeek,
  startOfYear,
  parseISO
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

const dateValidator = function(val) {
  return (
    null ||
    isDate(val) ||
    isDate(parseISO(val)) ||
    (Array.isArray(val) &&
      val.length === 2 &&
      (val.every(isDate) || val.every(isDate(parseISO))))
  );
};

const convertDate = value => {
  if (value && !isDate(value)) {
    return parseISO(value);
  }

  return value;
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
     * two options of returned value: 'date' - type Date format, 'iso' - ISO string format
     */
    outputFormat: {
      type: String,
      default: 'date',
      validator: val => ['date', 'iso'].includes(val)
    },
    placeholder: { type: String, default: null },
    /**
     * only for ranged types
     */
    startPlaceholder: {
      type: String,
      default: null
    },
    /**
     * only for ranged types
     */
    endPlaceholder: { type: String, default: null },
    /**
     * start with monday by default
     */
    firstDayOfWeek: {
      default: null,
      type: Number,
      validator: val => val === null || (val >= 0 && val <= 6)
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
     * type Date, type String (ISO), array for ranges
     */
    value: {
      type: [String, Array, Date],
      default: '',
      validator: dateValidator
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
    },
    /**
     * whether to append the popper to body
     */
    appendToBody: {
      type: Boolean,
      default: false
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

  provide() {
    return {
      picker: this
    };
  },

  computed: {
    calcFirstDayOfWeek() {
      if (!Number.isNaN(Number(this.firstDayOfWeek)))
        return this.firstDayOfWeek;
      return this.$Q.locale === 'ru' ? 1 : 0;
    },
    transformedValue() {
      if (Array.isArray(this.value) && this.value.length) {
        return [convertDate(this.value[0]), convertDate(this.value[1])];
      }

      if (isString(this.value)) return convertDate(this.value);

      return this.value;
    },
    rangeClasses() {
      return {
        'q-date-editor': true,
        'q-range-editor': true,
        'q-range-editor_disabled': this.pickerDisabled
      };
    },
    iconClass() {
      if (this.disabled) return 'q-icon-lock';
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
      if (Array.isArray(this.transformedValue)) {
        return !this.transformedValue.length;
      }

      return !this.transformedValue;
    },

    displayValue() {
      let formattedValue = '';

      if (Array.isArray(this.transformedValue)) {
        formattedValue = this.transformedValue.map(dateFromArray =>
          formatLocalDate(dateFromArray, this.format, this.$Q.locale)
        );
      } else if (
        isDate(this.transformedValue) &&
        isValid(this.transformedValue)
      ) {
        formattedValue = formatLocalDate(
          this.transformedValue,
          this.format,
          this.$Q.locale
        );
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
        this.emitChange(this.transformedValue);
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

  beforeDestroy() {
    this.destroyPopper();
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

      panel.style.zIndex = this.$Q?.zIndex ?? 2000;
    },

    destroyPopper() {
      if (this.popper) {
        this.popper.destroy();
        this.popper = null;
      }

      const dropdown = this.$refs?.panel?.$el;
      if (dropdown?.parentNode === document.body) {
        document.body.removeChild(dropdown);
      }
    },

    focus() {
      if (!this.ranged) {
        this.$refs.reference.focus();
      } else {
        this.handleFocus();
      }
    },

    formatToISO(date) {
      if (Array.isArray(date)) {
        return [formatISO(date[0]), formatISO(date[1])];
      }

      return formatISO(date);
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

    handleClose(e) {
      if (!this.pickerVisible) return;
      if (this.appendToBody) {
        const path = e.path || (e.composedPath && e.composedPath());
        const isClickToPanel = path.find(
          element => element === this.$refs.panel.$el
        );
        if (!isClickToPanel) {
          this.pickerVisible = false;
        }
      } else {
        this.pickerVisible = false;
      }
    },

    handleFocus() {
      this.pickerVisible = true;
      this.$emit('focus', this);
      if (
        !isDate(this.transformedValue) ||
        Array.isArray(this.transformedValue)
      )
        return;
      const format = this.timepicker ? 'dd.MM.yyyy, HH:mm:ss' : 'dd.MM.yy';
      this.userInput = formatLocalDate(
        this.transformedValue,
        format,
        this.$Q.locale
      );
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
      if (val !== this.value) {
        this.$emit('change', val);
        if (this.validateEvent) {
          this.qFormItem?.validateField('change');
        }
      }
    },

    emitInput(val) {
      let formatted = val;
      if (this.outputFormat === 'iso' && val) {
        formatted = this.formatToISO(val);
      }

      if (!isEqual(this.transformedValue, formatted)) {
        this.$emit('input', formatted);
      }
    }
  }
};
</script>
