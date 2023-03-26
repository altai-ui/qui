<template>
  <div class="q-slider-captions">
    <button
      v-for="(caption, index) in captionsList"
      :key="index"
      type="button"
      class="q-slider-captions__btn"
      :class="getBtnClasses(caption.value)"
      :style="getBtnStyles(caption.position)"
      @click="handleCaptionLabelClick(caption.value)"
    >
      {{ caption.label }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'QSliderCaptions',

  inject: ['slider'],

  computed: {
    vertical() {
      return this.slider.vertical;
    },

    min() {
      return this.slider.minByType;
    },

    max() {
      return this.slider.maxByType;
    },

    captionStep() {
      return this.slider.captionStep;
    },

    startValue() {
      return this.slider.startValue;
    },

    endValue() {
      return this.slider.endValue;
    },

    type() {
      return this.slider.type;
    },

    captions() {
      return this.slider.captions;
    },

    formatCaption() {
      return this.slider.formatCaption;
    },

    stepsCount() {
      return (this.max - this.min) / this.captionStep;
    },

    stepsWidth() {
      return (100 * this.captionStep) / (this.max - this.min);
    },

    stepSize() {
      return (this.max - this.min) / this.stepsCount;
    },

    captionsList() {
      if (this.type === 'date' && this.formatCaption) {
        return Array.from(
          { length: this.stepsCount + 1 },
          (_, item) => this.min + item * this.stepSize
        ).map((value, index) => ({
          value,
          position: index * this.stepsWidth,
          label: this.formatCaption(value)
        }));
      }

      if (!this.captions) return [];

      return Object.keys(this.captions)
        .map(parseFloat)
        .filter(value => value <= this.max && value >= this.min)
        .map(value => ({
          value,
          position: ((value - this.min) * 100) / (this.max - this.min),
          label: this.captions[value]
        }));
    }
  },

  methods: {
    getBtnStyles(position) {
      return this.vertical
        ? { bottom: `${position}%` }
        : { left: `${position}%` };
    },

    getBtnClasses(value) {
      return value === this.startValue || value === this.endValue
        ? 'q-slider-captions__btn_selected'
        : null;
    },

    handleCaptionLabelClick(value) {
      this.$emit('change', value);
    }
  }
};
</script>
