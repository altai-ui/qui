<template>
  <div
    class="q-slider-bar"
    :style="barStyle"
  />
</template>

<script>
export default {
  name: 'QSliderBar',

  computed: {
    barSize() {
      const { range, maxValue, minValue, max, min, startValue } = this.$parent;
      return range
        ? `${(100 * (maxValue - minValue)) / (max - min)}%`
        : `${(100 * (startValue - min)) / (max - min)}%`;
    },

    barStart() {
      const { range, minValue, max, min } = this.$parent;
      return range ? `${(100 * (minValue - min)) / (max - min)}%` : '0%';
    },

    barStyle() {
      if (this.$parent.vertical) {
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
