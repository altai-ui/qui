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

  inject: {
    qForm: {
      default: ''
    },
    qFormItem: {
      default: ''
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
    icon: {
      type: String,
      default: ''
    },
    nativeType: {
      type: String,
      default: 'button'
    },
    loading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    autofocus: {
      type: Boolean,
      default: false
    },
    circle: {
      type: Boolean,
      default: false
    },
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
        'q-button_disabled': this.disabled,
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
