<template>
  <component
    :is="rootTag"
    class="q-checkbox"
    :class="{
      'q-checkbox_disabled': isDisabled,
      'q-checkbox_checked': isChecked
    }"
  >
    <span
      class="q-checkbox__input"
      :class="{
        'q-checkbox__input_disabled': isDisabled,
        'q-checkbox__input_checked': isChecked,
        'q-checkbox__input_focus': focus
      }"
      :tabindex="indeterminate ? 0 : false"
      :role="indeterminate ? 'checkbox' : false"
      :aria-checked="indeterminate ? 'mixed' : false"
    >
      <span class="q-checkbox__inner">
        <span
          class="q-checkbox__inner-icon"
          :class="{
            'q-icon-minus': indeterminate,
            'q-icon-check': isChecked
          }"
        />
      </span>
      <input
        v-model="model"
        class="q-checkbox__original"
        type="checkbox"
        :aria-hidden="indeterminate ? 'true' : 'false'"
        :disabled="isDisabled"
        :value="label"
        :name="name"
        @change="handleChange"
        @focus="focus = true"
        @blur="focus = false"
      />
    </span>
    <span
      v-if="$slots.default || label"
      class="q-checkbox__label"
    >
      <slot>{{ label }}</slot>
    </span>
  </component>
</template>

<script>
import { isBoolean } from 'lodash-es';
import Emitter from '../../mixins/emitter';

export default {
  name: 'QCheckbox',
  componentName: 'QCheckbox',

  mixins: [Emitter],

  inject: {
    qForm: {
      default: null
    },
    qFormItem: {
      default: null
    }
  },

  props: {
    value: {
      type: [Object, Array, Boolean],
      default: () => ({})
    },
    label: { type: String, default: '' },
    indeterminate: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    checked: { type: Boolean, default: false },
    name: { type: String, default: '' },
    controls: { type: String, default: '' },
    rootTag: { type: String, default: 'label' }
  },

  data() {
    return {
      selfModel: false,
      focus: false,
      isLimitExceeded: false,
      isGroup: false
    };
  },

  computed: {
    model: {
      get() {
        const result = this.value !== undefined ? this.value : this.selfModel;
        return this.isGroup ? this.store : result;
      },
      set(val) {
        if (this.isGroup) {
          this.isLimitExceeded = false;
          if (
            val.length < this.checkboxGroup.min ||
            val.length > this.checkboxGroup.max
          ) {
            this.isLimitExceeded = true;
          }
          if (!this.isLimitExceeded)
            this.dispatch('QCheckboxGroup', 'input', [val]);
        } else {
          this.$emit('input', val);
          this.selfModel = val;
        }
      }
    },

    isChecked() {
      if (isBoolean(this.model)) return this.model;
      if (Array.isArray(this.model)) return this.model.includes(this.label);
      return false;
    },

    store() {
      return this.checkboxGroup ? this.checkboxGroup.value : this.value;
    },

    /* used to make the isDisabled judgment under max/min props */
    isLimitDisabled() {
      const { max, min } = this.checkboxGroup;
      return (
        (Boolean(max || min) && this.model.length >= max && !this.isChecked) ||
        (this.model.length <= min && this.isChecked)
      );
    },

    isDisabled() {
      return this.isGroup
        ? this.checkboxGroup.disabled ||
            this.disabled ||
            (this.qForm?.disabled ?? false) ||
            this.isLimitDisabled
        : this.disabled || (this.qForm?.disabled ?? false);
    }
  },

  watch: {
    value() {
      this.qFormItem?.validateField('change');
    }
  },

  created() {
    if (this.checked) this.addToStore();
  },

  mounted() {
    if (this.indeterminate) {
      this.$el.setAttribute('aria-controls', this.controls);
    }

    let parent = this.$parent;
    while (parent) {
      if (parent.$options.componentName !== 'QCheckboxGroup') {
        parent = parent.$parent;
        this.isGroup = false;
      } else {
        this.checkboxGroup = parent;
        this.isGroup = true;
        break;
      }
    }
  },

  methods: {
    addToStore() {
      if (Array.isArray(this.model) && this.model.includes(this.label)) {
        this.model.push(this.label);
        return;
      }

      this.model = false;
    },

    handleChange(event) {
      if (this.isLimitExceeded) return;
      const value = event.target.checked;
      this.$emit('change', value, event);

      if (this.isGroup) {
        this.$nextTick(() => {
          this.dispatch('QCheckboxGroup', 'change', [this.checkboxGroup.value]);
        });
      }
    }
  }
};
</script>
