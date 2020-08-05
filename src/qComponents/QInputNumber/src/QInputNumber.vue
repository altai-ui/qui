<template>
  <div
    class="q-input-number"
    :class="withControlsClass"
  >
    <button
      v-if="controls"
      class="q-input-number__button_decrease q-input-number__button q-icon-minus"
      :disabled="disabled"
      :class="decreaseClass"
      @click.prevent="handleDecreaseClick"
    />

    <q-input
      :value="currentValue"
      class="q-input-number__input"
      :disabled="disabled"
      @blur="handleBlur"
      @focus="handleFocus"
      @input="handleInput"
      @change="handleChange"
    />

    <button
      v-if="controls"
      class="q-input-number__button_increase q-input-number__button q-icon-plus"
      :disabled="disabled"
      :class="increaseClass"
      @click.prevent="handleIncreaseClick"
    />
  </div>
</template>

<script>
export default {
  name: 'QInputNumber',

  props: {
    min: {
      type: Number,
      default: Number.MIN_SAFE_INTEGER
    },
    max: {
      type: Number,
      default: Number.MAX_SAFE_INTEGER
    },
    step: {
      type: Number,
      default: 1
    },
    precision: {
      type: Number,
      default: 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    controls: {
      type: Boolean,
      default: true
    },
    value: {
      required: true,
      validator: value => {
        if (!Number.isNaN(Number(value)) || value === null) return true;

        return false;
      }
    }
  },

  data() {
    return {
      number: null,
      userNumber: null
    };
  },

  computed: {
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
      this.changesEmmiter(updatedNumber);
    },

    handleDecreaseClick() {
      const updatedNumber = Math.round((this.number - this.step) * 100) / 100;

      if (updatedNumber < this.min) return;
      this.changesEmmiter(updatedNumber);
    },

    handleBlur(event) {
      this.$emit('blur', event);
    },

    handleFocus(event) {
      this.$emit('focus', event);
    },

    handleInput(value) {
      this.userNumber = value;
    },

    handleChange(value) {
      const userValue = Number(value);

      this.userNumber = null;

      if (
        !value.length ||
        Number.isNaN(userValue) ||
        value > this.max ||
        value < this.min
      ) {
        return;
      }

      this.changesEmmiter(userValue);
    },

    changesEmmiter(value) {
      this.number = Number(value.toFixed(this.precision));

      this.$emit('input', this.number);
      this.$emit('change', this.number);
    }
  }
};
</script>
