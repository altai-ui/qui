<template>
  <div
    class="q-scrollbar__bar"
    :class="'q-scrollbar__bar_' + bar.key"
    @mousedown="handleTrackerClick"
  >
    <div
      ref="thumb"
      class="q-scrollbar__thumb"
      :style="renderThumbStyle({ size, move, bar })"
      @mousedown="handleThumbClick"
    />
  </div>
</template>

<script>
import { renderThumbStyle, BAR_MAP } from './util';
import { on, off } from '../../helpers';

export default {
  name: 'QBar',

  props: {
    type: {
      type: String,
      default: 'horizontal',
      validator: value => ['horizontal', 'vertical'].includes(value)
    },
    size: { type: String, default: '0' },
    move: { type: Number, default: 0 }
  },

  data() {
    return {
      renderThumbStyle
    };
  },

  computed: {
    bar() {
      return BAR_MAP[this.type];
    },

    wrap() {
      return this.$parent.wrap;
    }
  },

  destroyed() {
    off(document, 'mouseup', this.mouseUpDocumentHandler);
  },

  methods: {
    handleThumbClick(e) {
      // prevent click event of right button
      if (e.ctrlKey || e.button === 2) {
        return;
      }
      this.startDrag(e);
      this[this.bar.axis] =
        e.currentTarget[this.bar.offset] -
        (e[this.bar.client] -
          e.currentTarget.getBoundingClientRect()[this.bar.direction]);
    },

    handleTrackerClick(e) {
      const offset = Math.abs(
        e.target.getBoundingClientRect()[this.bar.direction] -
          e[this.bar.client]
      );
      const thumbHalf = this.$refs.thumb[this.bar.offset] / 2;
      const thumbPositionPercentage =
        ((offset - thumbHalf) * 100) / this.$el[this.bar.offset];

      this.wrap[this.bar.scroll] =
        (thumbPositionPercentage * this.wrap[this.bar.scrollSize]) / 100;
    },

    startDrag(e) {
      e.stopImmediatePropagation();
      this.cursorDown = true;

      on(document, 'mousemove', this.mouseMoveDocumentHandler);
      on(document, 'mouseup', this.mouseUpDocumentHandler);
      document.onselectstart = () => false;
    },

    mouseMoveDocumentHandler(e) {
      if (this.cursorDown === false) return;
      const prevPage = this[this.bar.axis];

      if (!prevPage) return;

      const offset =
        (this.$el.getBoundingClientRect()[this.bar.direction] -
          e[this.bar.client]) *
        -1;
      const thumbClickPosition = this.$refs.thumb[this.bar.offset] - prevPage;
      const thumbPositionPercentage =
        ((offset - thumbClickPosition) * 100) / this.$el[this.bar.offset];

      this.wrap[this.bar.scroll] =
        (thumbPositionPercentage * this.wrap[this.bar.scrollSize]) / 100;
    },

    mouseUpDocumentHandler() {
      this.cursorDown = false;
      this[this.bar.axis] = 0;
      off(document, 'mousemove', this.mouseMoveDocumentHandler);
      document.onselectstart = null;
    }
  }
};
</script>
