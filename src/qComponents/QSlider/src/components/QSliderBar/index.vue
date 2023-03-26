<template>
  <div
    class="q-slider-bar"
    :style="barStyle"
  />
</template>

<script>
export default {
  name: 'QSliderBar',

  inject: ['slider'],

  computed: {
    range() {
      return this.slider.range;
    },

    vertical() {
      return this.slider.vertical;
    },

    min() {
      return this.slider.minByType;
    },

    max() {
      return this.slider.maxByType;
    },

    minValue() {
      return this.slider.minValue;
    },

    maxValue() {
      return this.slider.maxValue;
    },

    startValue() {
      return this.slider.startValue;
    },

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
