<template>
  <transition
    name="q-notification-fade"
    @after-leave="handleHookAfterLeave"
  >
    <div
      v-if="isShown"
      class="q-notification"
      :class="notificationClasses"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div
        class="q-notification__icon"
        :class="[iconClass]"
      />

      <div class="q-notification__content">
        <slot>
          <template v-if="message">
            <template v-if="!dangerouslyUseHTMLString">
              {{ message }}
            </template>
            <div
              v-else
              v-html="message"
            />
          </template>
        </slot>
      </div>

      <button
        type="button"
        class="q-notification__close q-icon-close"
        @click="close"
      />
    </div>
  </transition>
</template>

<script>
export default {
  name: 'QNotification',
  componentName: 'QNotification',

  props: {
    /**
     * description text
     */
    message: {
      type: String,
      default: ''
    },
    /**
     * notification type
     */
    type: {
      type: String,
      default: null,
      validator: value =>
        ['success', 'warning', 'info', 'error'].includes(value)
    },
    /**
     * whether message is treated as HTML string
     */
    dangerouslyUseHTMLString: {
      type: Boolean,
      default: false
    },
    /**
     * icon class
     */
    icon: {
      type: String,
      default: null
    },
    /**
     * duration before close
     */
    duration: {
      type: Number,
      default: 4500
    },
    /**
     * callback function when closed
     */
    onClose: {
      type: Function,
      default: null
    }
  },

  data() {
    return {
      isShown: false,
      timer: null
    };
  },

  computed: {
    notificationClasses() {
      return {
        [`q-notification_type_${this.type}`]: Boolean(this.type)
      };
    },

    iconClass() {
      if (this.icon) return this.icon;

      switch (this.type) {
        case 'success':
          return 'q-icon-check';

        case 'warning':
        case 'error':
          return 'q-icon-attention-mark';

        default:
        case 'info':
          return 'q-icon-info';
      }
    }
  },

  mounted() {
    this.startTimer();
  },

  beforeDestroy() {
    const el = this.$el;
    if (el?.parentNode) {
      el.parentNode.removeChild(el);
    }

    this.clearTimer();
  },

  methods: {
    clearTimer() {
      if (this.timer) clearTimeout(this.timer);
    },

    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(this.close, this.duration);
      }
    },

    handleHookAfterLeave() {
      this.$destroy();
    },

    /**
     * @public
     */
    close() {
      if (typeof this.onClose === 'function') this.onClose();

      this.isShown = false;
    }
  }
};
</script>
