<template>
  <button
    type="button"
    :tabindex="tabIndex"
    class="q-slider-button"
    :style="wrapperStyle"
    @keydown.left="handleKeyDown"
    @keydown.right="handleKeyDown"
    @keydown.down.prevent="handleKeyDown"
    @keydown.up.prevent="handleKeyDown"
    @mousedown="handleButtonDown"
  >
    <div class="q-slider-button__target" />
    <div
      v-if="$parent.showTooltip"
      class="q-slider-button__tooltip"
    >
      {{ formattedValue }}
    </div>
  </button>
</template>

<script>
export default {
  name: 'QSliderButton',

  props: {
    tabIndex: {
      type: Number,
      default: 0
    },

    value: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      isDragging: false,
      isClick: false,
      clientX: 0,
      currentX: 0,
      clientY: 0,
      currentY: 0,
      startPosition: 0,
      newPosition: null,
      oldValue: this.value
    };
  },

  computed: {
    currentPosition() {
      const { min, max } = this.$parent;
      return `${((this.value - min) / (max - min)) * 100}%`;
    },

    formattedValue() {
      const { formatTooltip } = this.$parent;
      return (formatTooltip && formatTooltip(this.value)) || this.value;
    },

    wrapperStyle() {
      return this.$parent.vertical
        ? { bottom: this.currentPosition }
        : { left: this.currentPosition };
    },

    precision() {
      const { min, max, step } = this.$parent;

      const precisionsList = [min, max, step].map(value => {
        const decimal = `${value}`.split('.')[1];
        return decimal ? decimal.length : 0;
      });

      return Math.max.apply(null, precisionsList);
    }
  },

  watch: {
    isDragging(val) {
      this.$parent.isDragging = val;
    }
  },

  methods: {
    setPosition(value) {
      if (value === null || Number.isNaN(value)) return;

      let newPosition = value;
      if (newPosition < 0) {
        newPosition = 0;
      } else if (newPosition > 100) {
        newPosition = 100;
      }

      const { min, max, step } = this.$parent;

      const lengthPerStep = 100 / ((max - min) / step);
      const steps = Math.round(newPosition / lengthPerStep);

      let result = steps * lengthPerStep * (max - min) * 0.01 + min;
      result = parseFloat(result.toFixed(this.precision));
      this.$emit('input', result);

      if (!this.isDragging && this.value !== this.oldValue) {
        this.oldValue = this.value;
      }
    },

    handleButtonDown(event) {
      if (this.$parent.isDisabled) return;

      event.preventDefault();

      this.handleDragStart(event);

      window.addEventListener('mousemove', this.handleDragging);
      window.addEventListener('mouseup', this.handleDragEnd);
      window.addEventListener('contextmenu', this.handleDragEnd);
    },

    handleDragging(event) {
      if (!this.isDragging) return;

      this.isClick = false;

      const { getPathSize, vertical } = this.$parent;
      const { width, height } = getPathSize();

      let diff = 0;
      if (vertical) {
        this.currentY = event.clientY;
        diff = ((this.clientY - this.currentY) / height) * 100;
      } else {
        this.currentX = event.clientX;
        diff = ((this.currentX - this.clientX) / width) * 100;
      }

      this.newPosition = this.startPosition + diff;
      this.setPosition(this.newPosition);
    },

    handleKeyDown({ key }) {
      if (this.$parent.isDisabled) return;

      const { min, max, step } = this.$parent;

      if (key === 'ArrowLeft' || key === 'ArrowDown') {
        this.newPosition =
          parseFloat(this.currentPosition) - (step / (max - min)) * 100;
      } else {
        this.newPosition =
          parseFloat(this.currentPosition) + (step / (max - min)) * 100;
      }

      this.setPosition(this.newPosition);
      this.$parent.emitChange();
    },

    handleDragStart(event) {
      this.isDragging = true;
      this.isClick = true;

      if (this.$parent.vertical) {
        this.clientY = event.clientY;
      } else {
        this.clientX = event.clientX;
      }

      this.startPosition = parseFloat(this.currentPosition);
      this.newPosition = this.startPosition;
    },

    handleDragEnd() {
      if (!this.isDragging) return;

      this.$nextTick(() => {
        this.isDragging = false;

        if (!this.isClick) {
          this.setPosition(this.newPosition);
          this.$parent.emitChange();
        }
      });

      window.removeEventListener('mousemove', this.handleDragging);
      window.removeEventListener('mouseup', this.handleDragEnd);
      window.removeEventListener('contextmenu', this.handleDragEnd);
    }
  }
};
</script>
