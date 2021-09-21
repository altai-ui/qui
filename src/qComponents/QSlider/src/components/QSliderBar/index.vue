<template>
  <div
    class="q-slider-bar"
    :style="barStyle"
  />
</template>

<script>
export default {
  name: 'QSliderBar',

  props: {
    range: {
      type: Boolean,
      default: false
    },

    vertical: {
      type: Boolean,
      default: false
    },

    min: {
      type: Number,
      default: 0
    },

    max: {
      type: Number,
      default: 100
    },

    minValue: {
      type: Number,
      default: null
    },

    maxValue: {
      type: Number,
      default: null
    },

    startValue: {
      type: Number,
      default: null
    }
  },

  computed: {
    barSize() {
      return this.range
        ? `${(100 * (this.maxValue - this.minValue)) / (this.max - this.min)}%`
        : `${(100 * (this.startValue - this.min)) / (this.max - this.min)}%`;
    },

    barStart() {
      return this.range
        ? `${(100 * (this.minValue - this.min)) / (this.max - this.min)}%`
        : '0%';
    },

    barStyle() {
      if (this.vertical) {
        return {
          height: this.barSize,
          bottom: this.barStart
        };
      }

      return {
        width: this.barSize,
        left: this.barStart
      };
    }
  }
};
</script>
