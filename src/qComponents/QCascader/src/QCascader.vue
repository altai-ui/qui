<template>
  <div
    ref="reference"
    v-click-outside="() => toggleDropDownVisible(false)"
    :class="['q-cascader', { 'q-cascader_disabled': isDisabled }]"
    @click="toggleDropDownVisible(!dropDownVisible)"
  >
    <q-input
      ref="input"
      v-model="model"
      readonly
      :placeholder="placeholder"
      :disabled="isDisabled"
      :validate-event="false"
      :class="{ 'q-input_focus': dropDownVisible }"
      @focus="handleFocus"
      @blur="handleBlur"
      @input="handleInput"
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
            dropDownVisible && 'q-icon-triangle-down_reverse'
          ]"
          @click="toggleDropDownVisible(dropDownVisible)"
        />
      </template>
    </q-input>

    <div
      v-if="props.multiple"
      class="q-cascader__tags"
    >
      <q-tag
        v-for="(tag, index) in presentTags"
        :key="tag.key"
        :closable="tag.closable"
        @close="deleteTag(index)"
      >
        <span class="q-cascader__tag-text">{{ tag.text }}</span>
      </q-tag>
    </div>

    <transition
      name="q-zoom-in-top"
      @after-leave="handleDropdownLeave"
    >
      <div
        v-show="dropDownVisible"
        ref="popper"
        class="q-cascader__dropdown"
      >
        <q-cascader-panel
          ref="panel"
          v-model="checkedValue"
          :options="options"
          :props="props"
          @expand-change="handleExpandChange"
          @close="toggleDropDownVisible(false)"
        />
      </div>
    </transition>
  </div>
</template>

<script>
import { isEqual, isEmpty } from 'lodash-es';
import { createPopper } from '@popperjs/core';
import Emitter from '../../mixins/emitter';
import { addResizeListener, removeResizeListener } from '../../helpers';

import QCascaderPanel from './QCascaderPanel';

const DEFAULT_INPUT_HEIGHT = 40;

export default {
  name: 'QCascader',
  componentName: 'QCascader',

  components: {
    QCascaderPanel
  },

  mixins: [Emitter],

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    },
    qForm: {
      default: null
    },
    qFormItem: {
      default: null
    }
  },

  props: {
    value: { type: [Object, Array], default: () => ({}) },
    options: { type: Array, default: null },
    props: { type: Object, default: () => ({}) },
    placeholder: {
      type: String,
      default: 'Выберите'
    },
    disabled: Boolean,
    clearable: Boolean,
    separator: {
      type: String,
      default: ' / '
    },
    showAllLevels: {
      type: Boolean,
      default: true
    },
    collapseTags: Boolean
  },

  data() {
    return {
      dropDownVisible: false,
      checkedValue: this.value ?? null,
      inputValue: null,
      presentText: null,
      presentTags: [],
      checkedNodes: [],
      inputInitialHeight: 0,
      pressDeleteCount: 0,
      popper: null
    };
  },

  computed: {
    model: {
      get() {
        return this.props.multiple ? this.presentText : this.inputValue;
      },
      set(value) {
        this.inputValue = value;
      }
    },
    isDisabled() {
      return (
        this.disabled ||
        (this.qForm?.disabled ?? false) ||
        Boolean(this.elForm?.disabled)
      );
    },
    clearBtnVisible() {
      if (!this.clearable || this.isDisabled) {
        return false;
      }

      return this.props.multiple
        ? Boolean(this.checkedNodes.filter(node => !node.isDisabled).length)
        : Boolean(this.presentText);
    },
    panel() {
      return this.$refs.panel;
    }
  },

  watch: {
    disabled() {
      this.computePresentContent();
    },
    value(val) {
      if (!isEqual(val, this.checkedValue)) {
        this.checkedValue = val;
        this.computePresentContent();
      }
    },
    checkedValue(val) {
      const { value, dropDownVisible } = this;
      const { multiple } = this.props;
      if (!isEqual(val, value)) {
        this.computePresentContent();
        // hide dropdown when single mode
        if (!multiple && dropDownVisible) {
          this.toggleDropDownVisible(false);
        }

        this.$emit('input', val);
        this.$emit('change', val);
        this.dispatch('ElFormItem', 'el.form.change', [val]);
        this.qFormItem?.validateField('change');
      }
    },
    options: {
      handler() {
        this.$nextTick(this.computePresentContent);
      },
      deep: true
    },
    presentText(val) {
      this.inputValue = val;
    },
    presentTags(val, oldVal) {
      if (this.props.multiple && (val.length || oldVal.length)) {
        this.$nextTick(this.updateStyle);
      }
    }
  },

  mounted() {
    this.popper = createPopper(this.$refs.input?.$el, this.$refs.panel?.$el, {
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

    const { input } = this.$refs;
    this.inputInitialHeight = input?.$el?.offsetHeight ?? DEFAULT_INPUT_HEIGHT;

    if (!isEmpty(this.value)) {
      this.computePresentContent();
    }

    addResizeListener(this.$el, this.updateStyle);
  },

  beforeDestroy() {
    removeResizeListener(this.$el, this.updateStyle);
  },

  methods: {
    toggleDropDownVisible(visible) {
      if (this.isDisabled) return;

      const { dropDownVisible } = this;
      const { input } = this.$refs;
      if (visible === dropDownVisible) return;
      this.dropDownVisible = visible;
      if (visible) {
        this.$nextTick(() => {
          this.popper.update();
          this.panel.scrollIntoView();
        });
      }
      input.$refs.input.setAttribute('aria-expanded', visible);
      this.$emit('visible-change', visible);
    },
    handleDropdownLeave() {
      this.inputValue = this.presentText;
    },
    handleFocus(e) {
      this.$emit('focus', e);
    },
    handleBlur(e) {
      this.$emit('blur', e);
    },
    handleInput() {
      !this.dropDownVisible && this.toggleDropDownVisible(true);
    },
    handleClear() {
      this.presentText = '';
      this.panel.clearCheckedNodes();
    },
    handleExpandChange(value) {
      this.$nextTick(this.popper.update);
      this.$emit('expand-change', value);
    },
    computePresentContent() {
      // nextTick is required, because checked nodes may not change right now
      this.$nextTick(() => {
        if (this.props.multiple) {
          this.computePresentTags();
          this.presentText = this.presentTags.length ? ' ' : null;
        } else {
          this.computePresentText();
        }
      });
    },
    computePresentText() {
      const { checkedValue } = this;
      if (!isEmpty(checkedValue)) {
        const node = this.panel.getNodeByValue(checkedValue);
        if (node?.isLeaf) {
          this.presentText = node.getText(this.showAllLevels, this.separator);
          return;
        }
      }
      this.presentText = null;
    },
    computePresentTags() {
      const { isDisabled, showAllLevels, separator, collapseTags } = this;
      const checkedNodes = this.panel.getCheckedNodes(true);
      const tags = [];

      const genTag = node => ({
        node,
        key: node.uid,
        text: node.getText(showAllLevels, separator),
        closable: !isDisabled && !node.isDisabled
      });

      if (checkedNodes.length) {
        const [first, ...rest] = checkedNodes;
        const restCount = rest.length;
        tags.push(genTag(first));

        if (restCount) {
          if (collapseTags) {
            tags.push({
              key: -1,
              text: `+ ${restCount}`,
              closable: false
            });
          } else {
            rest.forEach(node => tags.push(genTag(node)));
          }
        }
      }

      this.checkedNodes = checkedNodes;
      this.presentTags = tags;
    },
    handleDelete() {
      const { inputValue, pressDeleteCount, presentTags } = this;
      const lastIndex = presentTags.length - 1;
      const lastTag = presentTags[lastIndex];
      this.pressDeleteCount = inputValue ? 0 : pressDeleteCount + 1;

      if (!lastTag) return;
      if (!this.pressDeleteCount) return;

      if (lastTag.hitState) {
        this.deleteTag(lastIndex);
      } else {
        lastTag.hitState = true;
      }
    },
    deleteTag(index) {
      const { checkedValue } = this;
      const val = checkedValue[index];
      this.checkedValue = checkedValue.filter((n, i) => i !== index);
      this.$emit('remove-tag', val);
    },
    updateStyle() {
      const { $el, inputInitialHeight } = this;
      if (!$el) return;

      const { suggestionPanel } = this.$refs;
      const inputInner = $el.querySelector('.q-input__inner');

      if (!inputInner) return;

      const tags = $el.querySelector('.q-cascader__tags');

      if (suggestionPanel?.$el) {
        const suggestionList = suggestionPanel?.$el.querySelector(
          '.q-cascader__suggestion-list'
        );
        suggestionList.style.minWidth = `${inputInner.offsetWidth}px`;
      }

      if (tags) {
        const { offsetHeight } = tags;
        const height = `${Math.max(offsetHeight + 6, inputInitialHeight)}px`;
        inputInner.style.height = height;
      }
    }
  }
};
</script>
