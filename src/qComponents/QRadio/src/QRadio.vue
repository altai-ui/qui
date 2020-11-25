<template>
  <label
    class="q-radio"
    :class="[
      { 'q-radio_disabled': isDisabled },
      { 'q-radio_focus': focus },
      { 'q-radio_checked': isChecked }
    ]"
    role="radio"
    :aria-checked="isChecked"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
  >
    <span class="q-radio__input">
      <span class="q-radio__inner" />
      <input
        class="q-radio__original"
        type="radio"
        aria-hidden="true"
        tabindex="-1"
        :name="name"
        :value="value"
        :checked="isChecked"
        :disabled="isDisabled"
        @focus="focus = true"
        @blur="focus = false"
        @change="handleChange"
      />
    </span>
    <span
      class="q-radio__label"
      @keydown.stop
    >
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script>
import Emitter from '../../mixins/emitter';

export default {
  name: 'QRadio',
  componentName: 'QRadio',

  mixins: [Emitter],

  inject: {
    qForm: {
      default: null
    },
    qFormItem: {
      default: null
    }
  },

  model: {
    prop: 'checked',
    event: 'change'
  },

  props: {
    /**
     * the value of Radio label
     */
    label: { type: String, default: '' },
    /**
     * binding value
     */
    value: { type: [String, Number, Boolean], default: '' },
    checked: { type: [String, Number, Boolean], default: false },
    /**
     * whether Radio is disabled
     */
    disabled: { type: Boolean, default: false },
    /**
     * as native name
     */
    name: { type: String, default: undefined }
  },

  data() {
    return {
      focus: false,
      isGroup: false,
      radioGroup: null
    };
  },

  computed: {
    isChecked() {
      if (this.isGroup) return this.radioGroup?.value === this.value;

      if (typeof this.checked === typeof this.value)
        return this.checked === this.value;

      return Boolean(this.checked);
    },

    isDisabled() {
      return (
        (this.isGroup && this.radioGroup.disabled) ||
        this.disabled ||
        (this.qForm?.disabled ?? false)
      );
    },

    tabIndex() {
      return this.isDisabled || (this.isGroup && !this.isChecked) ? -1 : 0;
    }
  },

  mounted() {
    let parent = this.$parent;

    while (parent) {
      if (parent.$options.componentName !== 'QRadioGroup') {
        parent = parent.$parent;
        this.isGroup = false;
      } else {
        this.radioGroup = parent;
        this.isGroup = true;
        break;
      }
    }
  },

  methods: {
    handleChange() {
      /**
       * triggers when the value changes
       */
      this.$emit('change', this.value);

      if (this.isGroup) {
        this.dispatch('QRadioGroup', 'change', this.value);
      }
    }
  }
};
</script>
