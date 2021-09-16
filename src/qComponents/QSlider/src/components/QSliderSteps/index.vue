<template>
  <div class="q-slider-steps">
    <div
      v-for="(item, key) in stepsList"
      :key="key"
      class="q-slider-steps__item"
      :style="getStopStyle(item)"
    />
  </div>
</template>

<script>
export default {
  name: 'QSliderSteps',

  computed: {
    stepsCount() {
      return (this.$parent.max - this.$parent.min) / this.$parent.step;
    },

    stepsWidth() {
      return (100 * this.$parent.step) / (this.$parent.max - this.$parent.min);
    },

    stepsList() {
      if (this.$parent.min > this.$parent.max) return [];

      return Array.from(
        { length: this.stepsCount + 1 },
        (_, item) => item * this.stepsWidth
      );
    }
  },

  methods: {
    getStopStyle(position) {
      return this.$parent.vertical
        ? { bottom: `${position}%` }
        : { left: `${position}%` };
    }
  }
};
</script>
