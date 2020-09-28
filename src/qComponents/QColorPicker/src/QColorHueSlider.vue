<template>
  <div class="q-color-hue-slider">
    <div
      ref="bar"
      class="q-color-hue-slider__bar"
      @click="handleBarClick"
    />
    <div
      ref="thumb"
      class="q-color-hue-slider__thumb"
      :style="thumbStyles"
    />
  </div>
</template>

<script>
import draggable from './draggable';

export default {
  name: 'QColorHueSlider',
  componentName: 'QColorHueSlider',

  props: {
    hue: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      thumbTop: 0
    };
  },

  computed: {
    thumbStyles() {
      return {
        top: `${this.thumbTop}px`
      };
    }
  },

  watch: {
    hue() {
      this.update();
    }
  },

  mounted() {
    const { bar, thumb } = this.$refs;
    const dragConfig = {
      drag: this.handleDrag,
      end: this.handleDrag
    };
    draggable(bar, dragConfig);
    draggable(thumb, dragConfig);

    this.update();
  },

  methods: {
    handleDrag(event) {
      const rect = this.$el.getBoundingClientRect();
      const { thumb } = this.$refs;

      let top = event.clientY - rect.top;
      top = Math.min(top, rect.height - thumb.offsetHeight / 2);
      top = Math.max(thumb.offsetHeight / 2, top);
      const hue = Math.round(
        ((top - thumb.offsetHeight / 2) / (rect.height - thumb.offsetHeight)) *
          360
      );

      this.$emit('update:hue', hue);
    },

    handleBarClick(event) {
      if (event.target !== this.$refs.thumb) {
        this.handleDrag(event);
      }
    },

    getThumbTop() {
      const el = this.$el;
      if (!el) return 0;

      return Math.round(
        (this.hue * (el.offsetHeight - this.$refs.thumb.offsetHeight * 1.5)) /
          360
      );
    },

    update() {
      this.thumbTop = this.getThumbTop();
    }
  }
};
</script>
