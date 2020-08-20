<template>
  <div :class="classes">
    <div
      ref="wrap"
      class="q-scrollbar__wrap"
      :class="wrapClasses"
      @scroll="handleScroll"
    >
      <div
        ref="resize"
        class="q-scrollbar__view"
        :class="viewClass"
        :style="viewStyle"
      >
        <slot />
      </div>
    </div>
    <q-bar
      v-show="sizeWidth !== ''"
      type="horizontal"
      :move="moveX"
      :size="sizeWidth"
    />
    <q-bar
      v-show="sizeHeight !== ''"
      type="vertical"
      :move="moveY"
      :size="sizeHeight"
    />
  </div>
</template>

<script>
import { addResizeListener, removeResizeListener } from '../../helpers';
import QBar from './QBar';

export default {
  name: 'QScrollbar',

  components: { QBar },

  props: {
    native: { type: Boolean, default: false },
    visible: { type: Boolean, default: false },
    theme: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary'].includes(value)
    },
    wrapClass: { type: [Object, String, Array], default: '' },
    viewClass: { type: [Object, String, Array], default: '' },
    viewStyle: { type: Object, default: null },
    noresize: { type: Boolean, default: false }
  },

  data() {
    return {
      sizeWidth: '0',
      sizeHeight: '0',
      moveX: 0,
      moveY: 0,
      observer: null
    };
  },

  computed: {
    wrap() {
      return this.$refs.wrap;
    },
    classes() {
      return ['q-scrollbar', this.visible && 'q-scrollbar_visible'];
    },

    wrapClasses() {
      return [this.wrapClass, { 'q-scrollbar__wrap_hidden-default': true }];
    }
  },

  mounted() {
    if (this.native) return;
    this.observer = new MutationObserver(this.update);
    this.observer.observe(this.$refs.resize, {
      attributes: true,
      childList: true,
      subtree: true
    });
    this.$nextTick(this.update);
    !this.noresize && addResizeListener(this.$refs.resize, this.update);
  },

  beforeDestroy() {
    if (this.native) return;
    this.observer.disconnect();
    !this.noresize && removeResizeListener(this.$refs.resize, this.update);
  },

  methods: {
    handleScroll() {
      const { wrap } = this;

      this.moveY = (wrap.scrollTop * 100) / wrap.clientHeight;
      this.moveX = (wrap.scrollLeft * 100) / wrap.clientWidth;
    },

    update() {
      const { wrap } = this;
      if (!wrap) return;

      const heightPercentage = (wrap.clientHeight * 100) / wrap.scrollHeight;
      const widthPercentage = (wrap.clientWidth * 100) / wrap.scrollWidth;

      this.sizeHeight = heightPercentage < 100 ? `${heightPercentage}%` : '';
      this.sizeWidth = widthPercentage < 100 ? `${widthPercentage}%` : '';
    }
  }
};
</script>
