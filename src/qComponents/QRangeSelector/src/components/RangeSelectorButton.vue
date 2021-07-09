<template>
  <div
    :tabindex="tabIndex"
    class="q-range-selector__button-wrapper focus-visible"
    :class="{ 'q-range-selector__button-wrapper_focused': isFocused }"
    :style="styles"
    @focus="handleFocus"
    @blur="handleBlur"
    @keydown.left="onDecreaseKeyDown"
    @keydown.right="onIncreaseKeyDown"
    @keydown.down.prevent="onDecreaseKeyDown"
    @keydown.up.prevent="onIncreaseKeyDown"
  >
    <div class="q-range-selector__button" />
    <div
      v-if="showTooltip"
      class="q-range-selector__tooltip"
    >
      {{ value }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'RangeSelectorButton',

  props: {
    tabIndex: {
      type: Number,
      default: 0
    },
    value: {
      type: Number,
      default: null
    },
    styles: {
      type: Object,
      default: null
    },
    showTooltip: {
      type: Boolean,
      default: true
    },
    step: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {
      isFocused: false
    };
  },

  methods: {
    handleFocus() {
      this.isFocused = true;
    },

    handleBlur() {
      this.isFocused = false;
    },

    onDecreaseKeyDown() {
      const newValue = this.value - this.step;
      this.$emit('on-decrease', { newValue, tabIndex: this.tabIndex });
    },

    onIncreaseKeyDown() {
      const newValue = this.value + this.step;
      this.$emit('on-increase', { newValue, tabIndex: this.tabIndex });
    }
  }
};
</script>
