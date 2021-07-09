<template>
  <div
    :tabindex="tabIndex"
    class="q-range-selector__button-wrapper focus-visible"
    :style="styles"
    @keydown.left="onLeftKeyDown"
    @keydown.right="onRightKeyDown"
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

  methods: {
    onLeftKeyDown() {
      const newValue = this.value - this.step;
      this.$emit('on-left-click', { newValue, tabIndex: this.tabIndex });
    },

    onRightKeyDown() {
      const newValue = this.value + this.step;
      this.$emit('on-right-click', { newValue, tabIndex: this.tabIndex });
    }
  }
};
</script>
