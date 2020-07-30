<template>
  <div class="q-color-alpha-slider">
    <div
      ref="bar"
      class="q-color-alpha-slider__bar"
      :style="barStyles"
      @click="handleBarClick"
    />
    <div
      ref="thumb"
      class="q-color-alpha-slider__thumb"
      :style="thumbStyles"
    />
  </div>
</template>

<script>
import draggable from './draggable';

export default {
  name: 'QColorAlphaSlider',

  props: {
    color: {
      type: String,
      required: true
    },
    alpha: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      thumbLeft: 0
    };
  },

  computed: {
    barStyles() {
      return {
        backgroundImage: `linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, ${this.color})`
      };
    },

    thumbStyles() {
      return {
        left: `${this.thumbLeft}px`
      };
    }
  },

  watch: {
    alpha() {
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

      let left = event.clientX - rect.left;
      left = Math.max(thumb.offsetWidth / 2, left);
      left = Math.min(left, rect.width - thumb.offsetWidth / 2);
      const alpha = Math.round(
        ((left - thumb.offsetWidth / 2) / (rect.width - thumb.offsetWidth)) *
          100
      );

      this.$emit('update:alpha', alpha);
    },

    handleBarClick(event) {
      if (event.target !== this.$refs.thumb) {
        this.handleDrag(event);
      }
    },

    getThumbLeft() {
      const el = this.$el;
      if (!el) return 0;

      return Math.round(
        (this.alpha * (el.offsetWidth - this.$refs.thumb.offsetWidth * 1.5)) /
          100
      );
    },

    update() {
      this.thumbLeft = this.getThumbLeft();
    }
  }
};
</script>
