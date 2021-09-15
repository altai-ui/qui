<template>
  <div
    class="slider-bar"
    :style="barStyle"
  />
</template>

<script>
export default {
  name: 'SliderBar',

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
      return this.$parent.vertical
        ? {
            height: this.barSize,
            bottom: this.barStart
          }
        : {
            width: this.barSize,
            left: this.barStart
          };
    }
  }
};
</script>
