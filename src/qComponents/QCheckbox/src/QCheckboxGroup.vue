<template>
  <component
    :is="tag"
    :class="['q-checkbox-group', `q-checkbox-group_${direction}`]"
    role="group"
    aria-label="checkbox-group"
  >
    <slot />
  </component>
</template>

<script>
import Emitter from '../../mixins/emitter';

export default {
  name: 'QCheckboxGroup',

  componentName: 'QCheckboxGroup',

  mixins: [Emitter],

  inject: {
    QFormItem: {
      default: ''
    },
    ElFormItem: {
      default: ''
    }
  },

  props: {
    value: {
      type: [Object, Array, Boolean],
      default: () => ({})
    },
    disabled: { type: Boolean, default: false },
    min: { type: Number, default: 0 },
    max: { type: Number, default: Infinity },
    tag: { type: String, default: 'div' },
    direction: {
      type: String,
      default: 'vertical',
      validator: value => ['vertical', 'horizontal'].includes(value)
    }
  },

  watch: {
    value(value) {
      this.dispatch('QFormItem', 'q.form.change', [value]);
      this.dispatch('ElFormItem', 'el.form.change', [value]);
    }
  }
};
</script>
