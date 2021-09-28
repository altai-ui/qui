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

    startValue() {
      return this.slider.startValue;
    },

    endValue() {
      return this.slider.endValue;
    },

    captions() {
      return this.slider.captions;
    },

    captionsList() {
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
