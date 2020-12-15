<template>
  <div :class="classes">
    <div
      ref="wrap"
      class="q-scrollbar__wrap"
      :class="wrapClasses"
      @scroll="handleScroll"
    >
      <component
        :is="viewTag"
        ref="resize"
        class="q-scrollbar__view"
        :class="viewClass"
        :style="viewStyle"
      >
        <slot />
      </component>
    </div>
    <q-bar
      v-show="sizeWidth !== ''"
      ref="xbar"
      type="horizontal"
      :move="moveX"
      :size="sizeWidth"
    />
    <q-bar
      v-show="sizeHeight !== ''"
      ref="ybar"
      type="vertical"
      :move="moveY"
      :size="sizeHeight"
    />
  </div>
</template>

<script>
import { addResizeListener, removeResizeListener } from '../../helpers';
import QBar from './QBar';

const OFFSET = -10;

export default {
  name: 'QScrollbar',
  componentName: 'QScrollbar',

  components: { QBar },

  props: {
    /**
     * passing DOM element will scroll content to it (works dynamically)
     */
    scrollTo: {
      type: HTMLElement,
      default: null
    },
    /**
     * whether scrollbar is always visible
     */
    visible: { type: Boolean, default: false },
    /**
     * changes style
     */
    theme: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary'].includes(value)
    },
    /**
     * custom wrapper content class (it helps you to style content)
     */
    wrapClass: { type: [Object, String, Array], default: '' },
    /**
     * custom inner content tag
     */
    viewTag: {
      type: String,
      default: 'div'
    },
    /**
     * custom inner content class
     */
    viewClass: { type: [Object, String, Array], default: '' },
    /**
     * custom inner content class
     */
    viewStyle: { type: Object, default: null },
    /**
     * whether is resizeListener will watch for parent
     */
    noresize: { type: Boolean, default: false }
  },

  data() {
    return {
      sizeWidth: '0',
      sizeHeight: '0',
      moveX: 0,
      moveY: 0
    };
  },

  computed: {
    wrap() {
      return this.$refs.wrap;
    },

    classes() {
      return [
        'q-scrollbar',
        this.visible && 'q-scrollbar_visible',
        this.sizeWidth !== '' && 'q-scrollbar_has-horizontal-bar',
        this.sizeHeight !== '' && 'q-scrollbar_has-vertical-bar'
      ];
    },

    wrapClasses() {
      return [this.wrapClass, { 'q-scrollbar__wrap_hidden-default': true }];
    }
  },

  watch: {
    scrollTo(element) {
      if (element) {
        this.$refs.ybar.scrollToPx(element.offsetTop + OFFSET);
      }
    },
    visible(value) {
      if (value) {
        const offset = this.scrollTo?.offsetTop ?? 0 + OFFSET;
        this.$refs.ybar.scrollToPx(offset);
      }
    }
  },

  mounted() {
    this.$nextTick(this.update);

    if (!this.noresize) {
      addResizeListener(this.$refs.resize, this.update);
      addResizeListener(this.$el.parentNode, this.update);
    }
  },

  beforeDestroy() {
    if (!this.noresize) {
      removeResizeListener(this.$refs.resize, this.update);
      removeResizeListener(this.$el.parentNode, this.update);
    }
  },

  methods: {
    /**
     * @public
     */
    handleScroll() {
      const { wrap } = this;

      this.moveY = (wrap.scrollTop * 100) / wrap.clientHeight;
      this.moveX = (wrap.scrollLeft * 100) / wrap.clientWidth;
    },

    /**
     * @public
     */
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
