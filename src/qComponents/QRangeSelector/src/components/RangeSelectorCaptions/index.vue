<template>
  <div class="range-selector-captions">
    <div
      v-for="(caption, index) in captionsList"
      :key="index"
      class="range-selector-captions__item"
      :style="getItemStyles(caption.position)"
    >
      <button
        type="button"
        class="range-selector-captions__btn"
        :class="getBtnClasses(caption.value)"
        @click="handleCaptionLabelClick(caption.value)"
      >
        {{ caption.label }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RangeSelectorCaptions',

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
    getItemStyles(position) {
      return this.$parent.vertical
        ? { bottom: `${position}%` }
        : { left: `${position}%` };
    },

    getBtnClasses(value) {
      const { startValue, endValue } = this.$parent;

      return value === startValue || value === endValue
        ? 'q-range-selector-captions__btn_selected'
        : null;
    },

    handleCaptionLabelClick(value) {
      this.$emit('change', value);
    }
  }
};
</script>
