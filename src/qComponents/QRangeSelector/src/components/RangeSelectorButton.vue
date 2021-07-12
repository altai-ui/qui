<template>
  <div
    :tabindex="tabIndex"
    class="q-range-selector__button-wrapper focus-visible"
    :class="{ 'q-range-selector__button-wrapper_focused': isFocused }"
    :style="stylePosition"
    @focus="handleFocus"
    @blur="handleBlur"
    @keydown.left="onDecreaseKeyDown"
    @keydown.right="onIncreaseKeyDown"
    @keydown.down.prevent="onDecreaseKeyDown"
    @keydown.up.prevent="onIncreaseKeyDown"
    @mousedown.stop="handleButtonDrag"
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
      required: true
    },
    value: {
      type: Number,
      required: true
    },
    showTooltip: {
      type: Boolean,
      required: true
    },
    step: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    vertical: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      isFocused: false,
      position: null
    };
  },

  computed: {
    buttonStyle() {
      if (this.vertical) return { bottom: `${this.position}%` };

      return { left: `${this.position}%` };
    },

    stylePosition() {
      if (this.vertical) return { bottom: `${this.position}%` };

      return { left: `${this.position}%` };
    }
  },

  mounted() {
    this.position = this.value;
  },

  methods: {
    handleFocus() {
      this.isFocused = true;
    },

    handleBlur() {
      this.isFocused = false;
    },

    onDecreaseKeyDown() {
      this.position = this.value - this.step;
      this.$emit('on-decrease', {
        newValue: this.position,
        tabIndex: this.tabIndex
      });
    },

    onIncreaseKeyDown() {
      this.position = this.value + this.step;
      this.$emit('on-increase', {
        newValue: this.position,
        tabIndex: this.tabIndex
      });
    },

    handleButtonDrag() {
      document.addEventListener('mousemove', this.handleButtonMoving);
      document.addEventListener('mouseup', this.handleButtonMovingEnd);
    },

    handleButtonMoving({ clientY, clientX }) {
      const { left, bottom, width, height } = this.$parent.getPathSize();

      const newPosition = this.vertical
        ? ((bottom - clientY) / height) * 100
        : ((clientX - left) / width) * 100;

      this.position =
        this.tabIndex === 0
          ? Math.max(this.min, newPosition.toFixed())
          : Math.min(this.max, newPosition.toFixed());

      this.$emit('on-drag-moving', {
        newValue: this.position,
        tabIndex: this.tabIndex
      });
    },

    handleButtonMovingEnd() {
      document.removeEventListener('mousemove', this.handleButtonMoving);
      document.removeEventListener('mouseup', this.handleButtonMovingEnd);

      this.$emit('on-drag-end', {
        newValue: this.position,
        tabIndex: this.tabIndex
      });
    }
  }
};
</script>
