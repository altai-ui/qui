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

  inject: {
    elFormItem: {
      default: ''
    },

    qFormItem: {
      default: ''
    }
  },

  mixins: [Emitter],

  props: {
    value: { type: [String, Number], default: '' },
    disabled: { type: Boolean, default: false },
    tag: { type: String, default: 'div' },
    direction: {
      type: String,
      default: 'vertical',
      validator: value => ['vertical', 'horizontal'].includes(value)
    }
  },

  watch: {
    value() {
      this.dispatch('ElFormItem', 'el.form.change', [this.value]);
      this.dispatch('QFormItem', 'q.form.change', [this.value]);
    }
  },

  created() {
    this.$on('handleChange', value => {
      this.$emit('change', value);
    });
  },

  destroyed() {
    this.$off('handleChange');
  },

  mounted() {
    const radios = this.$el.querySelectorAll('[type=radio]');
    const firstLabel = this.$el.querySelectorAll('[role=radio]')[0];

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
