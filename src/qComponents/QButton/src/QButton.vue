<template>
  <button
    class="q-button"
    :disabled="disabled || loading"
    :autofocus="autofocus"
    :type="nativeType"
    :class="classes"
    @click="handleClick"
  >
    <span
      v-if="loading"
      class="q-icon-reverse"
    />
    <span
      v-if="icon && !loading"
      :class="icon"
    />
    <span
      v-if="$slots.default"
      class="q-button__inner"
    >
      <slot />
    </span>
  </button>
</template>

<script>
export default {
  name: 'QButton',
  componentName: 'QButton',

  inject: {
    qForm: {
      default: null
    }
  },

  props: {
    type: {
      type: String,
      default: 'default',
      validator: value => ['default', 'icon'].includes(value)
    },
    theme: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary', 'link'].includes(value)
    },
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium'].includes(value)
    },
    /**
     * any q-icon
     */
    icon: {
      type: String,
      default: ''
    },
    /**
     * as native button type
     */
    nativeType: {
      type: String,
      default: 'button'
    },
    /**
     * whether to show loader inside button
     */
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * whether the button is disabled
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * as native button autofocus
     */
    autofocus: {
      type: Boolean,
      default: false
    },
    /**
     * change button's shape to circle (use with type icon)
     */
    circle: {
      type: Boolean,
      default: false
    },
    /**
     * sets button width to 100%
     */
    fullWidth: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    classes() {
      const classes = Object.entries({
        theme: this.theme,
        type: this.type,
        size: this.size
      })
        .filter(([, value]) => Boolean(value))
        .map(([key, value]) => `q-button_${key}_${value}`);

      classes.push({
        'q-button_disabled': this.disabled || (this.qForm?.disabled ?? false),
        'q-button_loading': this.loading,
        'q-button_circle': this.circle,
        'q-button_full-width': this.fullWidth
      });

      return classes;
    }
  },

  methods: {
    handleClick(evt) {
      this.$emit('click', evt);
    }
  }
};
</script>
