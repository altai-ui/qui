<template>
  <button
    type="button"
    :tabindex="tabIndex"
    class="q-slider-button"
    :class="btnClasses"
    :style="wrapperStyle"
    @keydown.left.prevent="handleKeyDown"
    @keydown.right.prevent="handleKeyDown"
    @keydown.down.prevent="handleKeyDown"
    @keydown.up.prevent="handleKeyDown"
    @mousedown="handleButtonDown"
  >
    <div class="q-slider-button__target" />
    <div
      v-if="showTooltip"
      class="q-slider-button__tooltip"
    >
      {{ formattedValue }}
    </div>
  </button>
</template>

<script>
export default {
  name: 'QSliderButton',

  inject: ['slider'],

  props: {
    value: {
      type: Number,
      default: 0
    },

    tabIndex: {
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
    btnClasses() {
      return {
        'q-slider-button_show-tooltip': this.isDragging
      };
    },

    min() {
      return this.slider.minByType;
    },

    max() {
      return this.slider.maxByType;
    },

    step() {
      return this.slider.step;
    },

    showTooltip() {
      return this.slider.showTooltip;
    },

    vertical() {
      return this.slider.vertical;
    },

    disabled() {
      return this.slider.disabled;
    },

    formatTooltip() {
      return this.slider.formatTooltip;
    },

    type() {
      return this.slider.type;
    },

    currentPosition() {
      return `${((this.value - this.min) / (this.max - this.min)) * 100}%`;
    },

    formattedValue() {
      return (
        (this.formatTooltip && this.formatTooltip(this.value)) || this.value
      );
    },

    wrapperStyle() {
      return this.vertical
        ? { bottom: this.currentPosition }
        : { left: this.currentPosition };
    },

    precision() {
      const precisionsList = [this.min, this.max, this.step].map(value => {
        const decimal = String(value).split('.')[1];
        return decimal ? decimal.length : 0;
      });

      return Math.max.apply(null, precisionsList);
    }
  },

  watch: {
    isDragging(value) {
      this.$emit('dragging', value);
    }
  },

  beforeDestroy() {
    document.removeEventListener('mousemove', this.handleDragging);
    document.removeEventListener('mouseup', this.handleDragEnd);
    document.removeEventListener('contextmenu', this.handleDragEnd);
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

      const lengthPerStep = 100 / ((this.max - this.min) / this.step);
      const steps = Math.round(newPosition / lengthPerStep);

      let result =
        steps * lengthPerStep * (this.max - this.min) * 0.01 + this.min;
      if (this.type === 'number') {
        result = parseFloat(result.toFixed(this.precision));
      }

      this.$emit('input', result);

      if (!this.isDragging && this.value !== this.oldValue) {
        this.oldValue = this.value;
      }
    },

    handleButtonDown(event) {
      if (this.disabled) return;

      event.preventDefault();

      this.handleDragStart(event);

      document.addEventListener('mousemove', this.handleDragging);
      document.addEventListener('mouseup', this.handleDragEnd);
      document.addEventListener('contextmenu', this.handleDragEnd);
    },

    handleDragging({ clientX, clientY }) {
      if (!this.isDragging) return;

      this.isClick = false;

      const { width, height } = this.$parent.getPathSize();

      let diff = 0;
      if (this.vertical) {
        this.currentY = clientY;
        diff = ((this.clientY - this.currentY) / height) * 100;
      } else {
        this.currentX = clientX;
        diff = ((this.currentX - this.clientX) / width) * 100;
      }

      this.newPosition = this.startPosition + diff;
      this.setPosition(this.newPosition);
    },

    handleKeyDown({ key }) {
      if (this.disabled) return;

      if (key === 'ArrowLeft' || key === 'ArrowDown') {
        this.newPosition =
          parseFloat(this.currentPosition) -
          (this.step / (this.max - this.min)) * 100;
      } else {
        this.newPosition =
          parseFloat(this.currentPosition) +
          (this.step / (this.max - this.min)) * 100;
      }

      this.setPosition(this.newPosition);
      this.$emit('change');
    },

    handleDragStart({ clientX, clientY }) {
      this.isDragging = true;
      this.isClick = true;

      if (this.vertical) {
        this.clientY = clientY;
      } else {
        this.clientX = clientX;
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
          this.$emit('change');
        }
      });

      document.removeEventListener('mousemove', this.handleDragging);
      document.removeEventListener('mouseup', this.handleDragEnd);
      document.removeEventListener('contextmenu', this.handleDragEnd);
    }
  }
};
</script>
