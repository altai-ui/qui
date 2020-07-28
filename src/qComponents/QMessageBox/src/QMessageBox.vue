<template>
  <transition
    name="q-msgbox-fade"
    @after-leave="handleHookAfterLeave"
  >
    <div
      v-if="isShown"
      class="q-message-box"
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
            </slot>

            <div class="q-message-box__submessage">
              {{ submessage }}
            </div>
          </div>

          <div class="q-message-box__actions">
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
    </div>
  </transition>
</template>

<script>
export default {
  name: 'QMessageBox',

  props: {
    title: {
      type: String,
      default: ''
    },
    message: {
      type: String,
      default: ''
    },
    submessage: {
      type: String,
      default: ''
    },
    dangerouslyUseHTMLString: {
      type: Boolean,
      default: false
    },
    confirmButtonText: {
      type: String,
      default: null
    },
    cancelButtonText: {
      type: String,
      default: null
    },
    closeOnClickShadow: {
      type: Boolean,
      default: true
    },
    distinguishCancelAndClose: {
      type: Boolean,
      default: false
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
      isComponentUsed: false,
      isShown: false,
      isConfirmBtnLoading: false,
      isCancelBtnLoading: false,
      callback: null
    };
  },

  mounted() {
    document.documentElement.style.overflow = 'hidden';
  },

  beforeDestroy() {
    document.documentElement.style.overflow = '';

    const el = this.$el;
    if (el?.parentNode === document.body) {
      document.body.removeChild(el);
    }
  },

  methods: {
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
