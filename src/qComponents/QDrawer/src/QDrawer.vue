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
        ref="drawer"
        tabindex="-1"
        class="q-drawer-wrapper"
        :style="drawerStyle"
        :class="[drawerClass, customClass]"
        @keyup.esc="closeDrawer"
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
  componentName: 'QDrawer',

  props: {
    width: {
      type: [String, Number],
      default: ''
    },
    /**
     * Drawer's title
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * whether Drawer is visible
     */
    visible: {
      type: Boolean,
      default: false
    },
    /**
     * whether the component will be deleted from layout
     */
    destroyOnClose: {
      type: Boolean,
      default: false
    },
    /**
     * closes Drawer by click on shadow layer
     */
    wrapperClosable: {
      type: Boolean,
      default: true
    },
    /**
     * callback before close
     */
    beforeClose: {
      type: Function,
      default: null
    },
    /**
     * Drawer's position
     */
    position: {
      type: String,
      default: 'right',
      validator(dir) {
        return ['left', 'right'].includes(dir);
      }
    },
    /**
     * Extra class names for Drawer's wrapper
     */
    customClass: {
      type: String,
      default: ''
    },
    /**
     * whether to append the popper to body
     */
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
      isRendered: false,
      elementToFocusAfterClosing: null
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

          document.removeEventListener('focus', this.handleDocumentFocus, true);
          if (this.destroyOnClose) {
            this.isRendered = false;
          }

          this.$nextTick(() => {
            this.elementToFocusAfterClosing?.focus();
          });
          return;
        }

        this.elementToFocusAfterClosing = document.activeElement;
        this.$nextTick(() => {
          this.$refs.drawer.focus();
        });
        this.$emit('open');
        this.zIndex = this.$Q?.zIndex ?? 2000;
        document.body.style.overflow = 'hidden';
        document.addEventListener('focus', this.handleDocumentFocus, true);

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
    handleDocumentFocus(event) {
      if (!this.$refs.drawer.contains(event.target)) {
        this.$refs.drawer.focus();
      }
    },

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
