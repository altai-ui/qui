<template>
  <label
    class="q-radio"
    :class="[
      { 'q-radio_disabled': isDisabled },
      { 'q-radio_focus': focus },
      { 'q-radio_checked': model === label }
    ]"
    role="radio"
    :aria-checked="model === label"
    :aria-disabled="isDisabled"
    :tabindex="tabIndex"
  >
    <span class="q-radio__input">
      <span class="q-radio__inner" />
      <input
        ref="radio"
        v-model="model"
        class="q-radio__original"
        :value="label"
        type="radio"
        aria-hidden="true"
        :name="name"
        :disabled="isDisabled"
        tabindex="-1"
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

  mixins: [Emitter],

  inject: {
    elForm: {
      default: ''
    },
    qForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    },
    qFormItem: {
      default: ''
    }
  },

  componentName: 'QRadio',

  props: {
    value: { type: [String, Number], default: '' },
    label: { type: [String, Number], default: '' },
    disabled: { type: Boolean, default: false },
    name: { type: String, default: '' }
  },

  data() {
    return {
      focus: false,
      isGroup: false
    };
  },

  computed: {
    model: {
      get() {
        return this.isGroup ? this.radioGroup.value : this.value;
      },
      set(val) {
        if (this.isGroup) {
          this.dispatch('QRadioGroup', 'input', [val]);
        } else {
          this.$emit('input', val);
        }
        if (this.$refs.radio)
          this.$refs.radio.checked = this.model === this.label;
      }
    },
    isDisabled() {
      return this.isGroup
        ? this.radioGroup.disabled ||
            this.disabled ||
            Boolean(this.elForm?.disabled) ||
            Boolean(this.qForm?.disabled)
        : this.disabled ||
            Boolean(this.elForm?.disabled) ||
            Boolean(this.qForm?.disabled);
    },
    tabIndex() {
      return this.isDisabled || (this.isGroup && this.model !== this.label)
        ? -1
        : 0;
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
      this.$nextTick(() => {
        this.$emit('change', this.model);
        if (this.isGroup)
          this.dispatch('QRadioGroup', 'handleChange', this.model);
      });
    }
  }
};
</script>
