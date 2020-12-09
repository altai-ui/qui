<template>
  <component
    :is="tag"
    :class="['q-radio-group', `q-radio-group_${direction}`]"
    role="radiogroup"
    @keydown="handleKeydown"
  >
    <slot />
  </component>
</template>

<script>
import Emitter from '../../mixins/emitter';

const keyCode = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

export default {
  name: 'QRadioGroup',
  componentName: 'QRadioGroup',

  mixins: [Emitter],

  inject: {
    qFormItem: {
      default: null
    }
  },

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    value: { type: [String, Number, Boolean], default: '' },
    /**
     * whether Radio is disabled
     */
    disabled: { type: Boolean, default: false },
    /**
     * custom element tag
     */
    tag: { type: String, default: 'div' },
    direction: {
      type: String,
      default: 'vertical',
      validator: value => ['vertical', 'horizontal'].includes(value)
    }
  },

  watch: {
    value() {
      this.qFormItem?.validateField('change');
    }
  },

  mounted() {
    const radios = this.$el.querySelectorAll('[type=radio]');
    const firstLabel = this.$el.querySelector('[role=radio]');

    if (![...radios].some(({ checked }) => checked) && firstLabel) {
      firstLabel.tabIndex = 0;
    }
  },

  methods: {
    handleKeydown(e) {
      const target = e.target;
      const selector =
        target.nodeName === 'INPUT' ? '[type=radio]' : '[role=radio]';
      const radios = this.$el.querySelectorAll(selector);
      const length = radios.length;
      const index = [...radios].indexOf(target);
      const roleRadios = this.$el.querySelectorAll('[role=radio]');

      switch (e.keyCode) {
        case keyCode.LEFT:
        case keyCode.UP:
          e.stopPropagation();
          e.preventDefault();
          if (index === 0) {
            roleRadios[length - 1].click();
            roleRadios[length - 1].focus();
          } else {
            roleRadios[index - 1].click();
            roleRadios[index - 1].focus();
          }
          break;

        case keyCode.RIGHT:
        case keyCode.DOWN:
          if (index === length - 1) {
            e.stopPropagation();
            e.preventDefault();
            roleRadios[0].click();
            roleRadios[0].focus();
          } else {
            roleRadios[index + 1].click();
            roleRadios[index + 1].focus();
          }
          break;

        default:
          break;
      }
    }
  }
};
</script>
