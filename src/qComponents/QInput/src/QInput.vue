<template>
  <div
    :class="classes"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div
      v-if="isSymbolLimitShown"
      class="q-input__count"
    >
      <span class="q-input__count-inner">
        Количество знаков: {{ textLength }}/{{ upperLimit }}
      </span>
    </div>
    <input
      ref="input"
      :tabindex="tabindex"
      class="q-input__inner"
      v-bind="$attrs"
      :type="nativeInputType"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :aria-label="label"
      @compositionstart="handleCompositionStart"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
    />
    <span
      v-if="isSuffixVisible"
      class="q-input__suffix"
    >
      <span class="q-input__suffix-inner">
        <template v-if="!isClearButtonShown || !isPasswordShown">
          <span
            v-if="suffixIcon"
            class="q-input__icon"
            :class="suffixIcon"
          />
          <slot
            v-else
            name="suffix"
          />
        </template>
        <span
          v-if="isClearButtonShown"
          class="q-input__icon q-icon-close"
          @click="handleClearClick"
        />
        <span
          v-if="isPasswordShown"
          class="q-input__icon"
          :class="passwordVisible ? 'q-icon-eye' : 'q-icon-eye-close'"
          @click="handlePasswordVisible"
        />
      </span>
    </span>
  </div>
</template>
<script>
import emitter from '../../mixins/emitter';
import inputs from '../../mixins/inputs';

export default {
  name: 'QInput',
  componentName: 'QInput',

  mixins: [emitter, inputs],

  props: {
    type: {
      type: String,
      default: 'text',
      validator: value =>
        [
          'text',
          'password',
          'number',
          'email',
          'hidden',
          'tel',
          'url'
        ].includes(value)
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    suffixIcon: { type: String, default: '' },
    clearable: {
      type: Boolean,
      default: false
    },
    showPassword: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      passwordVisible: false
    };
  },

  computed: {
    classes() {
      const mainClass = 'q-input';

      return [
        mainClass,
        {
          [`${mainClass}_disabled`]: this.inputDisabled,
          [`${mainClass}_suffix`]: this.isSuffixVisible
        }
      ];
    },

    isPasswordShown() {
      return (
        this.showPassword &&
        !this.inputDisabled &&
        !this.readonly &&
        (Boolean(this.nativeInputValue) || this.focused)
      );
    },

    nativeInputType() {
      let type = this.type;
      if (this.showPassword) {
        type = this.passwordVisible ? 'text' : 'password';
      }
      return type;
    },

    componentRef() {
      return this.$refs.input;
    },

    isSuffixVisible() {
      return (
        this.$slots.suffix ||
        this.suffixIcon ||
        this.isClearButtonShown ||
        this.showPassword
      );
    }
  },

  watch: {
    value(val) {
      if (!this.validateEvent) return;
      this.dispatch('ElFormItem', 'el.form.change', [val]);
      this.qFormItem?.validateField('change');
    },
    type() {
      this.$nextTick(() => {
        this.setNativeInputValue();
      });
    }
  },

  mounted() {
    this.setNativeInputValue();
  },

  methods: {
    handlePasswordVisible() {
      this.passwordVisible = !this.passwordVisible;
      this.focus();
    },
    handleClearClick() {
      this.$emit('input', '');
      this.$emit('change', '');
      this.$emit('clear');
    }
  }
};
</script>
