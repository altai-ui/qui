<template>
  <div
    :tabindex="tabIndex"
    class="q-range-selector__button-wrapper"
    :class="{ 'q-range-selector__button-wrapper_focused': isFocused }"
    :style="stylePosition"
    @focus="handleFocus"
    @blur="handleBlur"
    @keydown.left="handleKeyDown"
    @keydown.right="handleKeyDown"
    @keydown.down.prevent="handleKeyDown"
    @keydown.up.prevent="handleKeyDown"
    @mousedown="handleButtonDrag"
  >
    <div class="q-range-selector__button" />
    <div
      v-if="$parent.showTooltip"
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
      type: [Number, String],
      required: true
    },
    oppositeValue: {
      type: [Number, String],
      default: null
    },
    percent: {
      type: String,
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
    stylePosition() {
      if (this.$parent.vertical) return { bottom: `${this.percent}%` };

      return { left: `${this.percent}%` };
    }
  },

  watch: {
    value: {
      handler(val) {
        this.position = val;
      },
      immediate: true
    }
  },

  destroyed() {
    document.removeEventListener('mousemove', this.handleButtonMoving);
    document.removeEventListener('mouseup', this.handleButtonMovingEnd);
  },

  methods: {
    emitChanges() {
      this.$emit('position-change', this.position);
    },

    handleFocus() {
      this.isFocused = true;
    },

    handleBlur() {
      this.isFocused = false;
    },

    handleKeyDown({ key }) {
      const step =
        key === 'ArrowLeft' || key === 'ArrowDown'
          ? this.$parent.step * -1
          : this.$parent.step;

      const newPosition = Number(this.position) + step;

      if (
        (this.$parent.range &&
          this.tabIndex === 0 &&
          newPosition > this.oppositeValue) ||
        (this.tabIndex === 1 && newPosition < this.oppositeValue)
      )
        return;

      if (newPosition < this.$parent.min) {
        this.position = this.$parent.min;
      } else if (newPosition > this.$parent.max) {
        this.position = this.$parent.max;
      } else {
        this.position = newPosition;
      }

      this.emitChanges();
    },

    handleButtonDrag() {
      document.addEventListener('mousemove', this.handleButtonMoving);
      document.addEventListener('mouseup', this.handleButtonMovingEnd);
    },

    handleButtonMoving({ clientY, clientX }) {
      const {
        min,
        max,
        range,
        getPathSize,
        stickToSteps,
        steps,
        vertical
      } = this.$parent;
      const { left, bottom, width, height } = getPathSize();

      const newPercent = vertical
        ? ((bottom - clientY) / height) * 100
        : ((clientX - left) / width) * 100;

      console.log(newPercent);

      const newPosition = min + (newPercent * (max - min)) / 100;

      let targetValue = newPosition;

      if (stickToSteps) {
        targetValue = steps.reduce((a, b) =>
          Math.abs(b - newPosition) < Math.abs(a - newPosition) ? b : a
        );
      }

      if (range) {
        if (
          (this.tabIndex === 0 && targetValue > this.oppositeValue) ||
          (this.tabIndex === 1 && targetValue < this.oppositeValue)
        )
          return;

        this.position =
          this.tabIndex === 0
            ? Math.max(min, targetValue)
            : Math.min(max, targetValue);

        this.$emit('drag-moving', {
          newValue: this.position,
          tabIndex: this.tabIndex
        });
        return;
      }

      if (targetValue < min) {
        this.position = min;
      } else if (targetValue > max) {
        this.position = max;
      } else {
        this.position = targetValue;
      }

      this.$emit('drag-moving', this.position);
    },

    handleButtonMovingEnd() {
      document.removeEventListener('mousemove', this.handleButtonMoving);
      document.removeEventListener('mouseup', this.handleButtonMovingEnd);
      this.emitChanges();
    }
  }
};
</script>
