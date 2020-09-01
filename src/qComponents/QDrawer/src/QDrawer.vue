<template>
  <transition
    name="q-drawer-fade"
    @after-enter="afterEnter"
    @after-leave="afterLeave"
  >
    <div
      v-if="isRendered"
      v-show="visible"
      class="q-drawer"
      :style="{ zIndex }"
      @click.self="handleWrapperClick"
    >
      <div
        class="q-drawer-wrapper"
        :style="drawerStyle"
        :class="[drawerClass, customClass]"
      >
        <div class="q-drawer__header">
          <div
            v-if="title"
            class="q-drawer__title"
          >{{ title }}</div>
          <button
            class="q-drawer__close q-icon-close"
            @click="closeDrawer"
          />
        </div>
        <q-scrollbar>
          <div class="q-drawer__content">
            <slot />
          </div>
        </q-scrollbar>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'QDrawer',

  props: {
    width: {
      type: [String, Number],
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    wrapperClosable: {
      type: Boolean,
      default: true
    },
    beforeClose: {
      type: Function,
      default: null
    },
    position: {
      type: String,
      default: 'right',
      validator(dir) {
        return ['left', 'right'].includes(dir);
      }
    },
    customClass: {
      type: String,
      default: ''
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    renderOnMount: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      zIndex: null,
      isRendered: false
    };
  },

  computed: {
    drawerStyle() {
      return {
        width: Number(this.width) ? `${Number(this.width)}px` : this.width
      };
    },
    drawerClass() {
      return `q-drawer-wrapper_${this.position}`;
    }
  },

  watch: {
    visible: {
      handler(isVisible) {
        if (!isVisible) {
          document.body.style.overflow = '';

          if (this.destroyOnClose) {
            this.isRendered = false;
          }

          return;
        }

        this.$emit('open');
        this.zIndex = this.$Q?.zIndex ?? 2000;
        document.body.style.overflow = 'hidden';

        if (this.appendToBody && !this.isRendered)
          document.body.appendChild(this.$el);

        this.isRendered = true;
      },
      immediate: true
    }
  },

  mounted() {
    if (!this.renderOnMount) return;

    this.isRendered = true;
    if (this.appendToBody) document.body.appendChild(this.$el);
  },

  beforeDestroy() {
    document.body.style.overflow = '';

    if (this.$el?.parentNode === document.body) {
      this.$el.parentNode.removeChild(this.$el);
    }
  },

  methods: {
    afterEnter() {
      this.$emit('opened');
    },

    afterLeave() {
      this.$emit('closed');
    },

    handleWrapperClick() {
      if (!this.wrapperClosable) return;

      this.closeDrawer();
    },

    hide() {
      this.$emit('close');
      this.$emit('update:visible', false);
    },

    closeDrawer() {
      if (this.beforeClose) {
        this.beforeClose(this.hide);
      } else {
        this.hide();
      }
    }
  }
};
</script>