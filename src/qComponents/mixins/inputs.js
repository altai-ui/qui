export default {
  inheritAttrs: false,

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    },
    qForm: {
      default: ''
    },
    qFormItem: {
      default: ''
    }
  },

  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    showSymbolLimit: {
      type: Boolean,
      default: false
    },
    counterLimit: {
      type: Number,
      default: null
    },
    validateEvent: {
      type: Boolean,
      default: true
    },
    label: { type: String, default: '' },
    tabindex: { type: String, default: '' }
  },

  data() {
    return {
      hovering: false,
      focused: false,
      isComposing: false
    };
  },

  computed: {
    inputDisabled() {
      return (
        this.disabled ||
        Boolean(this.elForm?.disabled) ||
        Boolean(this.qForm?.disabled)
      );
    },

    nativeInputValue() {
      return String(this.value ?? '');
    },

    isClearButtonShown() {
      return (
        this.clearable &&
        !this.inputDisabled &&
        !this.readonly &&
        this.nativeInputValue &&
        (this.focused || this.hovering)
      );
    },

    isSymbolLimitShown() {
      return (
        this.showSymbolLimit &&
        (this.$attrs.maxlength || this.counterLimit) &&
        !this.inputDisabled &&
        !this.readonly &&
        !this.showPassword
      );
    },

    upperLimit() {
      return this.$attrs.maxlength ?? this.counterLimit;
    },

    textLength() {
      return this.value?.length ?? 0;
    }
  },

  watch: {
    nativeInputValue() {
      this.setNativeInputValue();
    }
  },

  created() {
    this.$on('inputSelect', this.select);
  },

  methods: {
    focus() {
      this.componentRef.focus();
    },

    blur() {
      this.componentRef.blur();
    },

    handleBlur(event) {
      this.focused = false;
      this.$emit('blur', event);
      if (this.validateEvent) {
        this.dispatch('ElFormItem', 'el.form.blur', [this.value]);
        this.dispatch('QFormItem', 'q.form.blur', [this.value]);
      }
    },

    select() {
      this.componentRef.select();
    },

    setNativeInputValue() {
      const input = this.componentRef;
      if (!input) return;
      if (input.value === this.nativeInputValue) return;
      input.value = this.nativeInputValue;
    },

    handleFocus(event) {
      this.focused = true;
      this.$emit('focus', event);
    },

    handleCompositionStart() {
      this.isComposing = true;
    },

    handleCompositionEnd(event) {
      if (this.isComposing) {
        this.isComposing = false;
        this.handleInput(event);
      }
    },

    handleInput(event) {
      // should not emit input during composition
      if (this.isComposing) return;
      this.$emit('input', event.target.value);
      // ensure native input value is controlled
      this.$nextTick(this.setNativeInputValue);
    },

    handleChange(event) {
      this.$emit('change', event.target.value);
    }
  }
};
