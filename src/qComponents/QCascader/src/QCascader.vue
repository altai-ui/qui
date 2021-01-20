<template>
  <div
    ref="reference"
    v-click-outside="hidePopper"
    :class="['q-cascader', { 'q-cascader_disabled': isDisabled }]"
  >
    <q-input
      ref="input"
      v-model="model"
      readonly
      :placeholder="calcPlaceholder"
      :disabled="isDisabled"
      :validate-event="false"
      aria-haspopup="true"
      role="button"
      :aria-controls="id"
      :aria-expanded="popper"
      :class="{
        'q-input_focus': Boolean(popper),
        'q-input_hover': areTagsHovered
      }"
      @mouseenter.native="handleMouseEnter"
      @mouseleave.native="showClose = false"
      @focus="handleInputFocus"
      @click="togglePopper"
    >
      <template slot="suffix">
        <span
          v-if="clearBtnVisible"
          key="clear"
          class="q-input__icon q-icon-close"
          @click.stop="handleClear"
        />
        <span
          v-else
          key="arrow-down"
          :class="[
            'q-input__icon',
            'q-icon-triangle-down',
            Boolean(popper) && 'q-icon-triangle-down_reverse'
          ]"
        />
      </template>
    </q-input>

    <div
      v-if="multiple"
      class="q-cascader__tags"
      @click="togglePopper"
      @mouseenter="handleTagsHover"
      @mouseleave="handleTagsLeave"
    >
      <template v-if="collapseTags">
        <q-tag
          v-for="(tag, index) in checkedNodes.slice(0, 1)"
          :key="index"
          closable
          @close="deleteTag(tag)"
        >
          <span
            v-if="allLevelsShown"
            class="q-cascader__tag-text"
          >{{
            tag.fullPathLabel
          }}</span>
          <span
            v-else
            class="q-cascader__tag-text"
          >{{ tag.label }}</span>
        </q-tag>
        <q-tag v-if="checkedNodes.length > 1">
          <span
            class="q-cascader__tag-text"
          >+{{ checkedNodes.length - 1 }}</span>
        </q-tag>
      </template>
      <template v-else>
        <q-tag
          v-for="(tag, index) in checkedNodes"
          :key="index"
          closable
          @close="deleteTag(tag)"
        >
          <span
            v-if="allLevelsShown"
            class="q-cascader__tag-text"
          >{{
            tag.fullPathLabel
          }}</span>
          <span
            v-else
            class="q-cascader__tag-text"
          >{{ tag.label }}</span>
        </q-tag>
      </template>
    </div>

    <q-cascader-panel
      ref="panel"
      v-model="checkedValues"
      :options="options"
    />
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core';
import Emitter from '../../mixins/emitter';
import { addResizeListener, removeResizeListener } from '../../helpers';

import QCascaderPanel from './QCascaderPanel';

const DEFAULT_INPUT_HEIGHT = 40;

const findFullPath = (branches, find) => {
  let level = null;
  for (let i = 0; i < branches.length; i += 1) {
    if (branches[i].value === find) {
      level = [branches[i].label];
      break;
    }
    if (branches[i].children) {
      const nextLevel = findFullPath(branches[i].children, find);
      if (nextLevel !== null) {
        level = [branches[i].label, nextLevel].flat(Infinity);
      }
    }
  }

  return level;
};

const getCheckedNodes = (options, checkedValues, separator) => {
  return options.reduce((acc, firstLevelOption) => {
    const getChecked = option => {
      if (checkedValues.includes(option.value)) {
        const transformedOption = {
          ...option,
          fullPathLabel: findFullPath(options, option.value).join(separator)
        };

        acc.push(transformedOption);
      }

      if (option.children) {
        option.children.forEach(getChecked);
      }
    };

    getChecked(firstLevelOption);
    return acc;
  }, []);
};

export default {
  name: 'QCascader',
  componentName: 'QCascader',

  components: {
    QCascaderPanel
  },

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
    /**
     * Array for multiple value, String for single
     */
    value: { type: [String, Array], default: null },
    /**
     * array of objects with required fields, example:
     * ```{
      value: 'guide',
      label: 'Guide',
      children: [{ ... }]
      }```
     */
    options: { type: Array, default: null },
    /**
     * as native placeholder
     */
    placeholder: {
      type: String,
      default: null
    },
    /**
     * whether QCascader is disabled
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * whether QCascader is clearable
     */
    clearable: {
      type: Boolean,
      default: true
    },
    /**
     * pick several values
     */
    multiple: {
      type: Boolean,
      default: false
    },
    /**
     * check each value as independent
     */
    checkStrictly: {
      type: Boolean,
      default: false
    },
    /**
     * separator in tags
     */
    separator: {
      type: String,
      default: ' / '
    },
    /**
     * whether all path to value in tags is shown
     */
    allLevelsShown: {
      type: Boolean,
      default: true
    },
    /**
     * hide tags in counter
     */
    collapseTags: { type: Boolean, default: true }
  },

  provide() {
    return {
      cascader: this
    };
  },

  data() {
    return {
      checkedValues: [],
      inputValue: null,
      presentText: null,
      checkedNodes: [],
      inputInitialHeight: 0,
      popper: null,
      showClose: false,
      areTagsHovered: false,
      focus: false,
      id: null
    };
  },

  computed: {
    model: {
      get() {
        return this.presentText;
      },
      set(value) {
        this.inputValue = value;
      }
    },
    calcPlaceholder() {
      return this.checkedNodes.length
        ? ''
        : this.placeholder ?? this.$t('QCascader.placeholder');
    },
    isDisabled() {
      return this.disabled || (this.qForm?.disabled ?? false);
    },
    clearBtnVisible() {
      return this.value && this.showClose;
    },
    panel() {
      return this.$refs.panel;
    }
  },

  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (Array.isArray(value) || (this.multiple && value === null)) {
          this.checkedValues = value;
        } else {
          this.inputValue = value;
        }
      }
    },

    checkedValues(val) {
      this.calcTags(val);
    },

    inputValue: {
      immediate: true,
      handler(val) {
        if (val) {
          const fullPath = findFullPath(this.options, val);
          if (this.allLevelsShown) {
            this.presentText = fullPath.join(this.separator);
          } else {
            this.presentText = fullPath[fullPath.length - 1];
          }
        } else {
          this.presentText = null;
          if (this.$refs.panel) {
            this.$refs.panel.activePath = [];
            this.$refs.panel.menus = [this.options];
          }
        }
      }
    },

    checkedNodes() {
      if (this.multiple) {
        this.$nextTick(this.updateStyle);
      }
    }
  },

  created() {
    this.id = `id${Date.now().toString(16)}`;
  },

  mounted() {
    const { input } = this.$refs;
    this.inputInitialHeight = input?.$el?.offsetHeight ?? DEFAULT_INPUT_HEIGHT;

    addResizeListener(this.$el, this.updateStyle);
    document.addEventListener('keyup', this.handleKeyUp, true);
  },

  beforeDestroy() {
    removeResizeListener(this.$el, this.updateStyle);
    document.removeEventListener('keyup', this.handleKeyUp, true);
  },

  methods: {
    handleKeyUp(e) {
      if (this.focus) {
        if (
          e.target.classList.contains('q-input__inner') &&
          e.key === 'Enter'
        ) {
          this.togglePopper();
        }

        if (e.key === 'Escape') {
          this.$refs.input.blur();
          this.hidePopper();
        }

        if (e.key === 'Backspace') {
          this.deleteTag();
        }

        if (e.key === 'Tab') {
          if (!this.$refs.reference.contains(document.activeElement)) {
            this.hidePopper();
            this.focus = false;
          }
        }

        if (
          ['ArrowRight', 'ArrowUp', 'ArrowLeft', 'ArrowDown'].includes(e.key)
        ) {
          this.$refs.panel.navigateFocus(e);
        }
      }
    },

    handleTagsHover() {
      this.areTagsHovered = true;
      this.showClose = true;
    },

    handleTagsLeave() {
      this.areTagsHovered = false;
      this.showClose = false;
    },

    handleMouseEnter() {
      if (this.disabled) return;
      if (this.clearable && this.value) {
        this.showClose = true;
      }
    },

    deleteTag({ value } = {}) {
      if (!this.checkedValues) return;
      const result = new Set(this.checkedValues);
      if (value) {
        result.delete(value);
      } else {
        result.delete(this.checkedValues[this.checkedValues.length - 1]);
      }
      const payload = Array.from(result);
      this.emit(payload.length ? payload : null);
    },

    emit(val) {
      this.$emit('change', val);
      this.qFormItem?.validateField('change');
    },

    handleClear() {
      this.emit(null);
      this.showClose = false;
    },

    calcTags(checkedValues) {
      if (!checkedValues) {
        this.checkedNodes = [];
        return;
      }

      this.checkedNodes = getCheckedNodes(
        this.options,
        this.checkedValues,
        this.separator
      );
    },

    togglePopper() {
      if (this.popper) {
        this.hidePopper();
      } else {
        this.showPopper();
      }
    },

    showPopper() {
      if (this.isDisabled) return;
      this.$refs.panel?.$el.setAttribute('data-show', '');
      this.popper = createPopper(this.$refs.reference, this.$refs.panel?.$el, {
        placement: 'bottom-start',
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 8]
            }
          }
        ]
      });

      this.$refs.panel.$el.style.zIndex = this.$Q?.zIndex ?? 2000;
    },

    hidePopper() {
      if (this.popper) {
        this.$refs.panel?.$el.removeAttribute('data-show');
        this.popper.destroy();
        this.popper = null;
      }
    },

    handleInputFocus(e) {
      this.$emit('focus', e);
      this.focus = true;
    },
    updateStyle() {
      const { $el, inputInitialHeight } = this;
      if (!$el) return;

      const inputInner = $el.querySelector('.q-input__inner');

      if (!inputInner) return;

      const tags = $el.querySelector('.q-cascader__tags');

      if (tags) {
        const { offsetHeight } = tags;
        const height = `${Math.max(offsetHeight + 6, inputInitialHeight)}px`;
        inputInner.style.height = height;
      }

      this.popper && this.popper.update();
    }
  }
};
</script>
