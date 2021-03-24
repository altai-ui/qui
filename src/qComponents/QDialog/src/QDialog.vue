<template>
  <transition
    name="q-dialog-fade"
    @after-enter="handleHookAfterEnter"
    @after-leave="handleHookAfterLeave"
  >
    <div
      v-if="isShown"
      ref="dialog"
      class="q-dialog"
      :style="dialogStyles"
      tabindex="-1"
      @keyup.esc="closeBox"
    >
      <div class="q-dialog__container">
        <q-scrollbar
          theme="secondary"
          view-class="q-dialog__view"
        >
          <div class="q-dialog__inner">
            <div class="q-dialog__title">
              {{ title }}
            </div>

            <q-button
              class="q-dialog__close"
              circle
              theme="secondary"
              type="icon"
              icon="q-icon-close"
              @click="closeBox"
            />

            <div class="q-dialog__content">
              <dialog-content
                v-bind="componentProps"
                @close="closeBox"
              />
            </div>
          </div>
        </q-scrollbar>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'QDialog',
  componentName: 'QDialog',

  props: {
    /**
     * z-index of the QDialog
     */
    zIndex: {
      type: Number,
      default: null
    },
    /**
     * offset from top border of parent relative element
     */
    offsetTop: {
      type: Number,
      default: null
    },
    /**
     * title of the QDialog
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * callback before QDialog closes, and it will prevent QDialog from closing
     */
    beforeClose: {
      type: Function,
      default: null
    },
    /**
     * pass props to child component
     */
    componentProps: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      isShown: false,
      callback: null,
      top: null,
      elementToFocusAfterClosing: null
    };
  },

  computed: {
    dialogStyles() {
      return {
        zIndex: this.zIndex,
        top: this.offsetTop ? `${this.offsetTop}px` : null
      };
    }
  },

  watch: {
    isShown(value) {
      if (value) {
        this.elementToFocusAfterClosing = document.activeElement;
        this.$nextTick(() => {
          this.$refs.dialog.focus();
        });
      }

      this.$emit(value ? 'open' : 'close');
    }
  },

  mounted() {
    document.documentElement.style.overflowY = 'hidden';
    document.addEventListener('focus', this.handleDocumentFocus, true);
  },

  beforeDestroy() {
    document.documentElement.style.overflowY = '';

    const el = this.$el;
    if (el?.parentNode) {
      el.parentNode.removeChild(el);
    }
  },

  methods: {
    handleDocumentFocus(event) {
      const { dialog } = this.$refs;
      if (dialog && !dialog.contains(event.target)) {
        dialog.focus();
      }
    },

    handleHookAfterEnter() {
      this.$emit('opened');
    },

    handleHookAfterLeave() {
      this.$emit('closed');
      this.$destroy();
    },

    async closeBox({ payload = null } = {}) {
      let isReadyToClose = true;

      if (typeof this.beforeClose === 'function') {
        isReadyToClose = await this.beforeClose({ payload, ctx: this });
      }

      if (isReadyToClose) {
        this.callback({ payload });

        this.isShown = false;

        document.removeEventListener('focus', this.handleDocumentFocus, true);
        this.$nextTick(() => {
          this.elementToFocusAfterClosing?.focus();
        });
      }
    }
  }
};
</script>
