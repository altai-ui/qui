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

  props: {
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

    step: {
      type: Number,
      default: 1
    }
  },

  computed: {
    stepsCount() {
      return (this.max - this.min) / this.step;
    },

    stepsWidth() {
      return (100 * this.step) / (this.max - this.min);
    },

    stepsList() {
      if (this.min > this.max) return [];

      return Array.from(
        { length: this.stepsCount + 1 },
        (_, item) => item * this.stepsWidth
      );
    }
  },

  methods: {
    getStopStyle(position) {
      return this.vertical
        ? { bottom: `${position}%` }
        : { left: `${position}%` };
    }
  }
};
</script>
