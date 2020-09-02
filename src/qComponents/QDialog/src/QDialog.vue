<template>
  <transition
    name="q-dialog-fade"
    @after-enter="handleHookAfterEnter"
    @after-leave="handleHookAfterLeave"
  >
    <div
      v-if="isShown"
      class="q-dialog"
      :style="dialogStyles"
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

  props: {
    zIndex: {
      type: Number,
      default: null
    },
    offsetTop: {
      type: Number,
      default: null
    },
    title: {
      type: String,
      default: ''
    },
    beforeClose: {
      type: Function,
      default: null
    },
    componentProps: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      isShown: false,
      callback: null,
      top: null
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
      this.$emit(value ? 'open' : 'close');
    }
  },

  mounted() {
    document.documentElement.style.overflowY = 'hidden';
  },

  beforeDestroy() {
    document.documentElement.style.overflowY = '';

    const el = this.$el;
    if (el?.parentNode) {
      el.parentNode.removeChild(el);
    }
  },

  methods: {
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
      }
    }
  }
};
</script>
