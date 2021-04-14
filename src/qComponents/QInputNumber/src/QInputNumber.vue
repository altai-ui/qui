<template>
  <div
    class="q-input-number"
    :class="withControlsClass"
  >
    <button
      v-if="controls"
      class="q-input-number__button_decrease q-input-number__button q-icon-minus"
      :disabled="isDisabled"
      :class="decreaseClass"
      @click.prevent="handleDecreaseClick"
    />

    <q-input
      ref="input"
      :value="currentValue"
      class="q-input-number__input"
      :disabled="isDisabled"
      :placeholder="placeholder"
      :validate-event="false"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleChangeInput($event, 'input')"
      @change="handleChangeInput($event, 'change')"
      @keydown.native="handleKeydown"
      @keyup.native="handleKeyup"
    />

    <button
      v-if="controls"
      class="q-input-number__button_increase q-input-number__button q-icon-plus"
      :disabled="isDisabled"
      :class="increaseClass"
      @click.prevent="handleIncreaseClick"
    />
  </div>
</template>

<script>
export default {
  name: 'QInputNumber',
  componentName: 'QInputNumber',

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
     * the minimum allowed value
     */
    min: {
      type: Number,
      default: Number.MIN_SAFE_INTEGER
    },

    /**
     * the maximum allowed value
     */
    max: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER
    },

    /**
     * incremental step
     */
    step: {
      type: Number,
      default: 1
    },

    /**
     * precision of input value
     */
    precision: {
      type: Number,
      default: 0
    },
    /**
     * whether the component is disabled
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * whether to enable the control buttons
     */
    controls: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: null
    },
    value: {
      type: [Number, String],
      default: null,
      validator: value => {
        if (!Number.isNaN(Number(value)) || value === null) return true;

        return false;
      }
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    /**
     * `String` before number
     */
    prefix: {
      type: String,
      default: null
    },
    /**
     * `String` after number
     */
    suffix: {
      type: String,
      default: null
    },
    /**
     * BCP47 language identifier
     */
    localization: {
      type: String,
      default: null
    },
    useGrouping: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      number: null,
      userValue: null,
      prevCaretPosition: 0,
      prevValue: '',
      prevSelectionPos: null
    };
  },

  computed: {
    isDisabled() {
      return this.disabled || (this.qForm?.disabled ?? false);
    },

    withControlsClass() {
      return { 'q-input-number_with-controls': this.controls };
    },

    increaseClass() {
      if (this.number >= this.max) {
        return 'q-input-number__button_is-disabled';
      }

      return '';
    },

    decreaseClass() {
      if (this.number <= this.min) {
        return 'q-input-number__button_is-disabled';
      }

      return '';
    },

    localizationTag() {
      return this.localization ?? this.$Q?.locale ?? 'en';
    },

    localeFormat() {
      return Intl.NumberFormat(this.localizationTag, {
        useGrouping: this.useGrouping,
        minimumFractionDigits: this.precision
      }).format;
    },

    currentValue() {
      let value = this.userValue ?? this.number ?? '';
      value = value ? this.getValueWithoutAdditions(value) : value;

      const isNumeric = value !== '' && value !== '-';
      value = !isNumeric ? value : this.localeFormat(value);

      const prefix = (isNumeric && this.prefix) || '';
      const suffix = (isNumeric && this.suffix) || '';

      return `${prefix}${value}${suffix}`;
    }
  },

  watch: {
    value: {
      handler(value) {
        this.number = value === null ? null : Number(value);
      },
      immediate: true
    }
  },

  methods: {
    setCursorPosition(target, position) {
      target.setSelectionRange(position, position);
    },

    handleIncreaseClick() {
      const updatedNumber = Math.round((this.number + this.step) * 100) / 100;

      if (updatedNumber > this.max) return;

      this.userValue = updatedNumber;
      this.changesEmmiter(updatedNumber, 'change');
    },

    handleDecreaseClick() {
      const updatedNumber = Math.round((this.number - this.step) * 100) / 100;

      if (updatedNumber < this.min) return;

      this.userValue = updatedNumber;
      this.changesEmmiter(updatedNumber, 'change');
    },

    handleBlur(event) {
      this.$emit('blur', event);
      if (this.validateEvent) this.qFormItem?.validateField('blur');
    },

    handleFocus(event) {
      this.$emit('focus', event);
    },

    getLocaleSeparator(type) {
      return Intl.NumberFormat(this.localizationTag)
        .format(type === 'decimal' ? 1.1 : 11111)
        .replace(/\p{Number}/gu, '');
    },

    checkStringAdditions(value, addition) {
      const position = String(value).indexOf(this[addition]);
      const expectedPosition =
        addition === 'suffix'
          ? String(value).length - this[addition].length
          : 0;

      return position === expectedPosition;
    },

    handleKeydown(event) {
      const {
        key,
        target: { value, selectionStart, selectionEnd }
      } = event;

      // range selection check
      if (selectionStart !== selectionEnd) return;

      const prefixLength = this.prefix?.length ?? 0;
      const suffixLength = this.suffix?.length ?? 0;

      this.prevSelectionPos =
        value === '-' ? selectionStart + 1 : selectionStart;

      let caretPos = selectionStart;

      if (key === 'Backspace' || key === 'Delete') {
        const thousandSeparator = this.getLocaleSeparator();
        const floatSeparator = this.getLocaleSeparator('decimal');

        const valuePart =
          key === 'Backspace'
            ? value[selectionStart - 1]
            : value[selectionStart];
        const correction = key === 'Backspace' ? -1 : 1;

        // move caret if deleted part is separator
        if (valuePart === thousandSeparator || valuePart === floatSeparator) {
          this.setCursorPosition(event.target, caretPos + correction);
          this.prevSelectionPos = caretPos + correction;
          this.prevValue = value;
          return;
        }
      }

      if (
        this.prefix &&
        this.checkStringAdditions(value, 'prefix') &&
        caretPos < prefixLength
      ) {
        caretPos = prefixLength;
        this.setCursorPosition(event.target, caretPos);
        this.prevSelectionPos = caretPos;
      }

      if (
        this.suffix &&
        this.checkStringAdditions(value, 'suffix') &&
        caretPos > value.length - suffixLength
      ) {
        caretPos = value.length - suffixLength;
        this.setCursorPosition(event.target, caretPos);
        this.prevSelectionPos = caretPos;
      }

      this.prevValue = value;
    },

    getFormattedPartsLength(value, caretPos) {
      return value.slice(0, caretPos).split(this.getLocaleSeparator()).length;
    },

    handleKeyup(event) {
      const { value, selectionStart, selectionEnd } = event.target;
      if (selectionStart !== selectionEnd) return;

      const isKeyDelete = event.key === 'Backspace' || event.key === 'Delete';
      const correction = isKeyDelete ? -1 : 1;

      const caretPos = this.prevSelectionPos + correction;

      const prevValueLength = this.getFormattedPartsLength(
        this.prevValue,
        caretPos
      );
      const valueLength = this.getFormattedPartsLength(value, caretPos);

      // add symbols and then format
      if (prevValueLength > valueLength) {
        this.setCursorPosition(event.target, caretPos - 1);

        // remove symbols and then format
      } else if (prevValueLength < valueLength) {
        this.setCursorPosition(event.target, caretPos + 1);

        // meta keys
      } else if (this.prevValue !== value) {
        this.setCursorPosition(event.target, caretPos);
      }

      this.prevSelectionPos = null;
    },

    parseLocaleNumber(stringNumber) {
      return parseFloat(
        stringNumber
          .replace(new RegExp(`\\${this.getLocaleSeparator()}`, 'g'), '')
          .replace(new RegExp(`\\${this.getLocaleSeparator('decimal')}`), '.')
      );
    },

    getSplittedValue(value, addition) {
      if (
        value &&
        this[addition] &&
        this.checkStringAdditions(value, addition)
      ) {
        const startCharReg = addition === 'prefix' ? '^' : '';
        const endCharReg = addition === 'suffix' ? '$' : '';

        return value.replace(
          new RegExp(`${startCharReg}${this[addition]}${endCharReg}`, 'g'),
          ''
        );
      }

      return value;
    },

    getValueWithoutAdditions(value) {
      if (!value) return value;

      let splittedValue = this.getSplittedValue(value, 'prefix');
      splittedValue = this.getSplittedValue(splittedValue, 'suffix');

      return splittedValue;
    },

    handleChangeInput(value, type) {
      const splittedValue = this.getValueWithoutAdditions(value);

      if (type === 'input' && splittedValue === '-') {
        this.userValue = value;
        return;
      }

      if (!splittedValue) {
        this.userValue = null;
        this.changesEmmiter(null, type);
        return;
      }

      this.processUserValue(splittedValue, type);
    },

    processUserValue(value, type) {
      const userValue = this.parseLocaleNumber(value);
      this.userValue = null;

      if (Number.isNaN(userValue) || value > this.max || value < this.min) {
        return;
      }

      if (type === 'change') {
        this.changesEmmiter(userValue, type);
        return;
      }

      this.$emit('input', Number(userValue.toFixed(this.precision)));
      if (this.validateEvent) this.qFormItem?.validateField('input');
    },

    changesEmmiter(value, type) {
      let passedData = null;

      if (value || value === 0) {
        this.number = Number(value.toFixed(this.precision));
        passedData = this.number;
      }

      if (type === 'change') {
        this.$emit('input', passedData);
        this.$emit('change', passedData);
        if (this.validateEvent) this.qFormItem?.validateField('change');
        return;
      }

      this.$emit('input', passedData);
      if (this.validateEvent) this.qFormItem?.validateField('input');
    }
  }
};
</script>
