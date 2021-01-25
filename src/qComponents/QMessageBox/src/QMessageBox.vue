<template>
  <transition
    name="q-msgbox-fade"
    @after-leave="handleHookAfterLeave"
  >
    <div
      v-if="isShown"
      ref="messageBox"
      class="q-message-box"
      :class="wrapClass"
      :style="[wrapStyle, { zIndex }]"
      tabindex="-1"
      @keyup.esc="closeBox"
    >
      <q-scrollbar
        theme="secondary"
        class="q-message-box__scrollbar"
        view-class="q-message-box__view"
        visible
      >
        <div
          class="q-message-box__shadow"
          @click="handleShadowClick"
        />

        <div class="q-message-box__container">
          <div class="q-message-box__title">
            {{ title }}
          </div>

          <button
            class="q-message-box__close q-icon-close"
            @click="handleCloseBtnClick"
          />

          <message-box-content
            v-if="isComponentUsed"
            v-bind="componentProps"
            @close="closeBox"
          />
          <template v-else>
            <div class="q-message-box__content">
              <slot>
                <template v-if="message">
                  <div
                    v-if="!dangerouslyUseHTMLString"
                    class="q-message-box__message"
                  >
                    {{ message }}
                  </div>
                  <div
                    v-else
                    class="q-message-box__message"
                    v-html="message"
                  />
                </template>
              </slot>

              <div
                v-if="submessage"
                class="q-message-box__submessage"
              >
                {{ submessage }}
              </div>
            </div>

            <div
              v-if="isActionsSectionShown"
              class="q-message-box__actions"
            >
              <q-button
                v-if="confirmButtonText"
                :loading="isConfirmBtnLoading"
                :disabled="isCancelBtnLoading"
                @click="handleConfirmBtnClick"
              >
                {{ confirmButtonText }}
              </q-button>

              <q-button
                v-if="cancelButtonText"
                theme="secondary"
                :loading="isCancelBtnLoading"
                :disabled="isConfirmBtnLoading"
                @click="handleCancelBtnClick"
              >
                {{ cancelButtonText }}
              </q-button>
            </div>
          </template>
        </div>
      </q-scrollbar>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'QMessageBox',
  componentName: 'QMessageBox',

  props: {
    /**
     * z-index of the QMessageBox
     */
    zIndex: {
      type: Number,
      default: null
    },
    /**
     * title of the QMessageBox
     */
    title: {
      type: String,
      default: ''
    },
    /**
     * content of the QMessageBox
     */
    message: {
      type: String,
      default: ''
    },
    /**
     * subcontent of the QMessageBox
     */
    submessage: {
      type: String,
      default: ''
    },
    /**
     * whether message is treated as HTML string
     */
    dangerouslyUseHTMLString: {
      type: Boolean,
      default: false
    },
    /**
     * text content of confirm button
     */
    confirmButtonText: {
      type: String,
      default: null
    },
    /**
     * text content of cancel button
     */
    cancelButtonText: {
      type: String,
      default: null
    },
    /**
     * whether QMessageBox can be closed by clicking the mask
     */
    closeOnClickShadow: {
      type: Boolean,
      default: true
    },
    /**
     * whether to distinguish canceling and closing the QMessageBox
     */
    distinguishCancelAndClose: {
      type: Boolean,
      default: false
    },
    /**
     * callback before QMessageBox closes, and it will prevent QMessageBox from closing
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
    },
    /**
     * class list of the QMessageBox
     */
    wrapClass: {
      type: [String, Object, Array],
      default: null
    },
    /**
     * style list of the QMessageBox
     */
    wrapStyle: {
      type: [String, Object, Array],
      default: null
    }
  },

  data() {
    return {
      isComponentUsed: false,
      isShown: false,
      isConfirmBtnLoading: false,
      isCancelBtnLoading: false,
      callback: null,
      elementToFocusAfterClosing: null
    };
  },

  computed: {
    isActionsSectionShown() {
      return Boolean(this.confirmButtonText) || Boolean(this.cancelButtonText);
    }
  },

  watch: {
    isShown(value) {
      if (!value) return;

      this.elementToFocusAfterClosing = document.activeElement;
      this.$nextTick(() => {
        this.$refs.messageBox.focus();
      });
    }
  },

  mounted() {
    document.documentElement.style.overflow = 'hidden';
    document.addEventListener('focus', this.handleDocumentFocus, true);
  },

  beforeDestroy() {
    document.documentElement.style.overflow = '';

    const el = this.$el;
    if (el?.parentNode === document.body) {
      document.body.removeChild(el);
    }
  },

  methods: {
    handleDocumentFocus(event) {
      if (!this.$refs.messageBox.contains(event.target)) {
        this.$refs.messageBox.focus();
      }
    },

    handleHookAfterLeave() {
      this.$destroy();
    },

    async closeBox({ action, payload = null }) {
      let isReadyToClose = true;

      if (typeof this.beforeClose === 'function') {
        isReadyToClose = await this.beforeClose({ action, payload, ctx: this });
      }

      if (isReadyToClose) {
        this.callback({ action, payload });
        this.isShown = false;

        document.removeEventListener('focus', this.handleDocumentFocus, true);
        this.$nextTick(() => {
          this.elementToFocusAfterClosing?.focus();
        });
      }
    },

    handleConfirmBtnClick() {
      this.closeBox({ action: 'confirm' });
    },

    handleCancelBtnClick() {
      this.closeBox({ action: 'cancel' });
    },

    handleCloseBtnClick() {
      this.closeBox({
        action: this.distinguishCancelAndClose ? 'close' : 'cancel'
      });
    },

    handleShadowClick() {
      if (!this.closeOnClickShadow) return;

      this.closeBox({
        action: this.distinguishCancelAndClose ? 'close' : 'cancel'
      });
    }
  }
};
</script>
