<template>
  <div
    v-show="visible"
    class="q-select-dropdown__item"
    :class="{
      'q-select-dropdown__item_selected': itemSelected,
      'q-select-dropdown__item_disabled':
        disabled || groupDisabled || limitReached,
      'q-select-dropdown__item_hover': hover
    }"
    @mouseenter="hoverItem"
    @click.stop="selectOptionClick"
  >
    <slot>
      {{ currentLabel }}
    </slot>
  </div>
</template>

<script>
import { isEqual, get, escapeRegExp } from 'lodash-es';
import Emitter from '../../mixins/emitter';

export default {
  name: 'QOption',
  mixins: [Emitter],

  componentName: 'QOption',

  inject: ['select'],

  props: {
    value: {
      type: [Object, String],
      required: true
    },
    label: { type: [String, Number], default: '' },
    created: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      index: -1,
      groupDisabled: false,
      visible: true,
      hitState: false,
      hover: false
    };
  },

  computed: {
    isObject() {
      return typeof this.value === 'object';
    },

    currentLabel() {
      return this.label ?? (this.isObject ? '' : this.value);
    },

    currentValue() {
      return (this.value || this.label) ?? '';
    },

    itemSelected() {
      if (!this.select.multiple) {
        return isEqual(this.value, this.select.value);
      }

      return this.contains(this.select.value, this.value);
    },

    limitReached() {
      if (this.select.multiple) {
        return (
          !this.itemSelected &&
          (this.select.value || []).length >= this.select.multipleLimit &&
          this.select.multipleLimit > 0
        );
      }
      return false;
    }
  },

  watch: {
    currentLabel() {
      if (!this.created && !this.select.remote)
        this.dispatch('QSelect', 'setSelected');
    },
    value(val, oldVal) {
      const { remote, valueKey } = this.select;
      if (
        !this.created &&
        !remote &&
        valueKey &&
        typeof val === 'object' &&
        typeof oldVal === 'object' &&
        val[valueKey] === oldVal[valueKey]
      )
        return;
      this.dispatch('QSelect', 'setSelected');
    }
  },

  created() {
    this.select.options.push(this);
    this.select.cachedOptions.push(this);
    this.select.optionsCount += 1;
    this.select.filteredOptionsCount += 1;

    this.$on('queryChange', this.queryChange);
    this.$on('handleGroupDisabled', this.handleGroupDisabled);
  },

  beforeDestroy() {
    const { selected, multiple } = this.select;
    const selectedOptions = multiple ? selected : [selected];
    const index = this.select.cachedOptions.indexOf(this);
    const selectedIndex = selectedOptions.indexOf(this);

    // if option is not selected, remove it from cache
    if (index > -1 && selectedIndex < 0) {
      this.select.cachedOptions.splice(index, 1);
    }
    this.select.onOptionDestroy(this.select.options.indexOf(this));
  },

  methods: {
    contains(arr = [], target) {
      if (!this.isObject) {
        return arr?.indexOf(target) > -1;
      }
      const valueKey = this.select.valueKey;
      return arr?.some(item => {
        return get(item, valueKey) === get(target, valueKey);
      });
    },

    handleGroupDisabled(val) {
      this.groupDisabled = val;
    },

    hoverItem() {
      if (!this.disabled && !this.groupDisabled) {
        this.select.hoverIndex = this.select.options.indexOf(this);
      }
    },

    selectOptionClick() {
      if (!this.disabled && !this.groupDisabled) {
        this.dispatch('QSelect', 'handleOptionClick', [this, true]);
      }
    },

    queryChange(query) {
      this.visible =
        new RegExp(escapeRegExp(query), 'i').test(this.currentLabel) ||
        this.created;
      if (!this.visible) {
        this.select.filteredOptionsCount -= 1;
      }
    }
  }
};
</script>
