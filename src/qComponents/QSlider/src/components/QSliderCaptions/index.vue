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

  computed: {
    captionsList() {
      const { captions, min, max } = this.$parent;

      if (!captions) return [];

      return Object.keys(captions)
        .map(parseFloat)
        .filter(value => value <= max && value >= min)
        .map(value => ({
          value,
          position: ((value - min) * 100) / (max - min),
          label: captions[value]
        }));
    }
  },

  methods: {
    getBtnStyles(position) {
      return this.$parent.vertical
        ? { bottom: `${position}%` }
        : { left: `${position}%` };
    },

    getBtnClasses(value) {
      const { startValue, endValue } = this.$parent;

      return value === startValue || value === endValue
        ? 'q-slider-captions__btn_selected'
        : null;
    },

    handleCaptionLabelClick(value) {
      this.$emit('change', value);
    }
  }
};
</script>
