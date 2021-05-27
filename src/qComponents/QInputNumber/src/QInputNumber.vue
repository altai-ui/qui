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
      :value="formattedValue"
      class="q-input-number__input"
      :disabled="isDisabled"
      :placeholder="placeholder"
      :validate-event="false"
      @blur="handleBlur"
      @focus="handleFocus"
      @keydown.native="handleKeydown"
      @keypress.native="onInputKeyPress"
      @click.native="handleClick"
      @paste.native="handlePaste"
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

  computed: {
    isDisabled() {
      return this.disabled || (this.qForm?.disabled ?? false);
    },

    withControlsClass() {
      return { 'q-input-number_with-controls': this.controls };
    },

    increaseClass() {
      const number = this.formattedValue
        ? this.parseLocaleNumber(
            this.getValueWithoutAdditions(this.formattedValue)
          )
        : 0;

      if (number >= this.max) {
        return 'q-input-number__button_is-disabled';
      }

      return '';
    },

    decreaseClass() {
      const number = this.formattedValue
        ? this.parseLocaleNumber(
            this.getValueWithoutAdditions(this.formattedValue)
          )
        : 0;

      if (number <= this.min) {
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

    formattedValue() {
      return this.value !== null
        ? `${this.prefix ?? ''}${this.localeFormat(this.value)}${this.suffix ??
            ''}`
        : '';
    }
  },

  methods: {
    setCursorPosition(target, position) {
      target.setSelectionRange(position, position);
    },

    getLocaleSeparator(type) {
      return Intl.NumberFormat(this.localizationTag)
        .format(type === 'decimal' ? 1.1 : 11111)
        .replace(/\p{Number}/gu, '');
    },

    parseLocaleNumber(stringNumber) {
      return parseFloat(
        stringNumber
          .replace(new RegExp(`\\${this.getLocaleSeparator()}`, 'g'), '')
          .replace(new RegExp(`\\${this.getLocaleSeparator('decimal')}`), '.')
      );
    },

    getFormattedPartsLength(value, caretPos) {
      return value.slice(0, caretPos).split(this.getLocaleSeparator()).length;
    },

    checkStringAdditions(value, addition) {
      const position = String(value).indexOf(this[addition]);
      const expectedPosition =
        addition === 'suffix'
          ? String(value).length - this[addition].length
          : 0;

      return position === expectedPosition;
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

    isCharReadonly(char) {
      return Number.isNaN(Number(char)) && char !== '-';
    },

    handleClick(event) {
      const { input } = this.$refs.input.$refs;
      const { value, selectionStart, selectionEnd } = input;

      if (selectionStart !== selectionEnd) {
        event.preventDefault();
        return;
      }

      const prefixLength = this.prefix?.length ?? 0;
      const suffixLength = this.suffix?.length ?? 0;

      if (selectionStart < prefixLength + 1) {
        this.setCursorPosition(input, prefixLength);
      } else if (selectionStart > value.length - suffixLength - 1) {
        this.setCursorPosition(input, value.length - suffixLength);
      }
    },

    handlePaste(event) {
      event.preventDefault();

      const data = (event.clipboardData || window.clipboardData).getData(
        'Text'
      );

      this.insertPasteText(event, data);
    },

    onInputKeyPress(event) {
      event.preventDefault();

      if (
        // numbers
        (event.keyCode < 48 || event.keyCode > 57) &&
        // minus
        event.keyCode !== 45 &&
        event.key !== '.' &&
        event.key !== ','
      )
        return;

      this.insertText(event, event.key);
    },

    handleKeydown(event) {
      const { value, selectionStart, selectionEnd } = event.target;
      const prefixLength = this.prefix?.length ?? 0;
      const suffixLength = this.suffix?.length ?? 0;

      switch (event.key) {
        case 'Backspace':
        case 'Delete':
          event.preventDefault();
          this.insertText(event, event.key);
          break;
        case 'ArrowLeft':
        case 'ArrowRight':
          if (
            (event.key === 'ArrowLeft' && selectionStart < prefixLength + 1) ||
            (event.key === 'ArrowRight' &&
              selectionEnd > value.length - suffixLength - 1)
          ) {
            event.preventDefault();
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          this.setCursorPosition(event.target, prefixLength);
          break;
        case 'ArrowDown':
          event.preventDefault();
          this.setCursorPosition(event.target, value.length - suffixLength);
          break;
        default:
          break;
      }
    },

    insertPasteText(event, text) {
      const parsedText = this.parseLocaleNumber(
        this.getValueWithoutAdditions(text)
      );
      if (Number.isNaN(Number(parsedText))) return;

      const { selectionStart, selectionEnd } = event.target;

      const previousPart = this.getValueWithoutAdditions(
        this.formattedValue.substring(0, selectionStart)
      );
      const lastPart = this.getValueWithoutAdditions(
        this.formattedValue.substring(selectionEnd)
      );

      const newValue = this.parseLocaleNumber(
        `${previousPart}${parsedText}${lastPart}`
      );

      this.updateValue(
        event.target,
        newValue.toFixed(this.precision),
        selectionEnd
      );
    },

    insertText(event, key) {
      const { value, selectionStart, selectionEnd } = event.target;

      let selectionMove = 0;
      let selectionNewEnd = selectionEnd;
      let selectionNewStart = selectionStart;
      let insertedValue = '';

      const prefixLength = this.prefix?.length ?? 0;
      const suffixLength = this.suffix?.length ?? 0;

      if (prefixLength && selectionStart <= prefixLength) {
        selectionNewStart = prefixLength;
      }

      if (suffixLength && selectionEnd >= value.length - suffixLength) {
        selectionNewEnd = value.length - suffixLength;
      }

      const previousPart = this.getValueWithoutAdditions(
        this.formattedValue.substring(0, selectionNewStart)
      );
      const lastPart = this.getValueWithoutAdditions(
        this.formattedValue.substring(selectionNewEnd)
      );

      if (
        this.formattedValue &&
        ((key === 'Backspace' && !previousPart.length) ||
          (key === 'Delete' && !lastPart.length))
      ) {
        if (
          selectionNewEnd - selectionNewStart ===
          this.getValueWithoutAdditions(value).length
        ) {
          this.updateValue(event.target, null, selectionNewEnd);
        }
        return;
      }

      const prevChar = previousPart.substring(previousPart.length - 1);
      const nextChar = lastPart.substring(1, -1);

      switch (key) {
        case this.getLocaleSeparator('decimal'):
          if (nextChar === this.getLocaleSeparator('decimal')) {
            this.setCursorPosition(event.target, selectionStart + 1);
          }
          return;
        case '-':
          if (!this.formattedValue) {
            this.$refs.input.$refs.input.value = '-';
            return;
          }
          insertedValue = key;
          break;
        case 'Backspace':
          selectionMove = this.isCharReadonly(prevChar) ? -2 : -1;
          selectionNewEnd -= this.isCharReadonly(prevChar) ? 1 : 0;
          break;
        case 'Delete':
          selectionMove = this.isCharReadonly(nextChar) ? 1 : 0;
          selectionNewEnd += this.isCharReadonly(nextChar) ? 2 : 1;
          break;
        default:
          if (!this.formattedValue) {
            this.updateValue(
              event.target,
              Number(`-${key}`).toFixed(this.precision),
              selectionNewEnd
            );
            return;
          }
          insertedValue = key;
          break;
      }

      const valueSeparatedParts = [
        value.substring(prefixLength, selectionNewStart + selectionMove),
        value.substring(selectionNewEnd, value.length - suffixLength)
      ];

      if (
        !valueSeparatedParts[0] &&
        valueSeparatedParts[1].substring(1, -1) ===
          this.getLocaleSeparator('decimal')
      ) {
        this.updateValue(event.target, null, selectionNewEnd);
        return;
      }

      const newValue = this.parseLocaleNumber(
        `${valueSeparatedParts[0]}${insertedValue}${valueSeparatedParts[1]}`
      );

      if (newValue > this.max || newValue < this.min) return;

      this.updateValue(
        event.target,
        newValue.toFixed(this.precision),
        selectionNewEnd,
        newValue < 0 || key === '-'
      );
    },

    updateValue(target, newValue, selectionEnd, isMinusSign) {
      if (newValue === null) {
        this.changesEmmiter(null);
        return;
      }

      const minusZero = Number(newValue) === 0 && isMinusSign;

      const formattedValue = `${this.prefix ?? ''}${this.localeFormat(
        minusZero ? -0 : newValue
      )}${this.suffix ?? ''}`;

      const newLength = formattedValue.length;
      const prefixLength = this.prefix?.length ?? 0;
      const newCaretPosition =
        target.value.length > 1
          ? selectionEnd + (newLength - target.value.length || 1)
          : target.value.length + prefixLength + 1;

      this.$refs.input.$refs.input.value = formattedValue;

      this.changesEmmiter(Number(minusZero ? -0 : newValue));

      let movedCaret = newCaretPosition;

      if (newCaretPosition < prefixLength) {
        movedCaret = prefixLength;
      } else if (newCaretPosition > formattedValue.length - prefixLength) {
        movedCaret = formattedValue.length - prefixLength;
      }

      this.setCursorPosition(target, movedCaret);
    },

    handleIncreaseClick() {
      let updatedNumber = this.formattedValue
        ? this.parseLocaleNumber(
            this.getValueWithoutAdditions(this.formattedValue)
          )
        : 0;
      updatedNumber = Math.round((updatedNumber + this.step) * 100) / 100;

      if (updatedNumber > this.max) return;

      this.changesEmmiter(updatedNumber, 'change');
    },

    handleDecreaseClick() {
      let updatedNumber = this.formattedValue
        ? this.parseLocaleNumber(
            this.getValueWithoutAdditions(this.formattedValue)
          )
        : 0;
      updatedNumber = Math.round((updatedNumber - this.step) * 100) / 100;

      if (updatedNumber < this.min) return;

      this.changesEmmiter(updatedNumber, 'change');
    },

    handleBlur(event) {
      this.$emit('blur', event);
      this.changesEmmiter(
        this.parseLocaleNumber(
          this.getValueWithoutAdditions(event.target.value)
        ),
        'change'
      );
      if (this.validateEvent) this.qFormItem?.validateField('blur');
    },

    handleFocus(event) {
      this.$emit('focus', event);
    },

    changesEmmiter(value, type) {
      if (type === 'change') {
        this.$emit('input', value);
        this.$emit('change', value);
        if (this.validateEvent) this.qFormItem?.validateField('change');
        return;
      }

      this.$emit('input', value);
      if (this.validateEvent) this.qFormItem?.validateField('input');
    }
  }
};
</script>
