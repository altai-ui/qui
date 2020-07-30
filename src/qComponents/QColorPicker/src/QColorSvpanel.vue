<template>
  <div
    class="q-color-svpanel"
    :style="rootStyles"
  >
    <div
      class="q-color-svpanel__cursor"
      :style="cursorStyles"
    />
  </div>
</template>

<script>
import draggable from './draggable';

export default {
  name: 'QColorSvpanel',

  props: {
    hue: {
      type: Number,
      required: true
    },
    saturation: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },

  data() {
    return {
      cursorTop: 0,
      cursorLeft: 0
    };
  },

  computed: {
    rootStyles() {
      return {
        backgroundColor: `hsl(${this.hue}, 100%, 50%)`
      };
    },

    cursorStyles() {
      return {
        top: `${this.cursorTop}px`,
        left: `${this.cursorLeft}px`
      };
    }
  },

  watch: {
    saturation() {
      this.update();
    },
    value() {
      this.update();
    }
  },

  mounted() {
    draggable(this.$el, {
      drag: this.handleDrag,
      end: this.handleDrag
    });

    this.update();
  },

  methods: {
    update() {
      const { clientWidth: width, clientHeight: height } = this.$el;
      this.cursorLeft = (this.saturation * width) / 100;
      this.cursorTop = ((100 - this.value) * height) / 100;
    },

    handleDrag(event) {
      const rect = this.$el.getBoundingClientRect();

      let left = event.clientX - rect.left;
      let top = event.clientY - rect.top;
      left = Math.min(Math.max(0, left), rect.width);
      top = Math.min(Math.max(0, top), rect.height);

      this.cursorLeft = left;
      this.cursorTop = top;

      this.$emit('update:saturation', (left / rect.width) * 100);
      this.$emit('update:value', 100 - (top / rect.height) * 100);
    }
  }
};
</script>
