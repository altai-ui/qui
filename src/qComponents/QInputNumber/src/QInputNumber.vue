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
      :value="currentValue"
      class="q-input-number__input"
      :disabled="isDisabled"
      :placeholder="placeholder"
      :validate-event="false"
      type="number"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleChangeInput($event, 'input')"
      @change="handleChangeInput($event, 'change')"
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
    }
  },

  data() {
    return {
      number: null,
      userNumber: null,
      prevNumber: null
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

    currentValue() {
      return (this.userNumber ?? this.number ?? '').toString();
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
    handleIncreaseClick() {
      const updatedNumber = Math.round((this.number + this.step) * 100) / 100;

      if (updatedNumber > this.max) return;

      this.userNumber = updatedNumber;
      this.changesEmmiter(updatedNumber, 'change');
    },

    handleDecreaseClick() {
      const updatedNumber = Math.round((this.number - this.step) * 100) / 100;

      if (updatedNumber < this.min) return;

      this.userNumber = updatedNumber;
      this.changesEmmiter(updatedNumber, 'change');
    },

    handleBlur(event) {
      this.$emit('blur', event);
      if (this.validateEvent) this.qFormItem?.validateField('blur');
    },

    handleFocus(event) {
      this.$emit('focus', event);
    },

    handleChangeInput(value, type) {
      if (!value) {
        this.userNumber = value;
        this.changesEmmiter(null, type);
        return;
      }

      this.processUserValue(value, type);
    },

    processUserValue(value, type) {
      const userValue = Number(value);
      this.userNumber = null;

      if (Number.isNaN(userValue) || value > this.max || value < this.min) {
        return;
      }

      this.prevNumber = userValue;

      if (type === 'change') {
        this.changesEmmiter(userValue, type);
        return;
      }

      this.$emit('input', Number(userValue.toFixed(this.precision)));
      if (this.validateEvent) this.qFormItem?.validateField('input');
    },

    changesEmmiter(value, type) {
      let passedData = null;

      if (value && value !== null) {
        this.number = Number(value.toFixed(this.precision));
        passedData = this.number;
      }

      this.prevNumber = passedData;

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
