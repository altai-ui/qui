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
        :class="getBtnClasses(caption.point)"
        @click="handleCaptionLabelClick(caption.point)"
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
        .sort((a, b) => a - b)
        .filter(point => point <= max && point >= min)
        .map(point => ({
          point,
          position: ((point - min) * 100) / (max - min),
          label: captions[point]
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
      return value === this.$parent.startValue ||
        value === this.$parent.endValue
        ? 'q-range-selector-captions__btn_selected'
        : null;
    },

    handleCaptionLabelClick(value) {
      this.$emit('select', value);
    }
  }
};
</script>
