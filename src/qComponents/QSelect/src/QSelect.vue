<template>
  <div
    v-click-outside="handleClose"
    class="q-select"
    @click="toggleMenu"
  >
    <div
      v-if="multiple"
      ref="tags"
      class="q-select__tags"
      :style="tagsStyle"
    >
      <template v-if="collapseTags && selected.length">
        <q-tag
          :closable="!selectDisabled"
          @close="deleteTag($event, selected[0])"
        >
          <span class="q-select__tags-text">{{
            selected[0].currentLabel
          }}</span>
        </q-tag>
        <q-tag
          v-if="selected.length > 1"
          :closable="false"
        >
          <span class="q-select__tags-text">+ {{ selected.length - 1 }}</span>
        </q-tag>
      </template>
      <transition-group
        v-if="!collapseTags"
        @after-leave="resetInputHeight"
      >
        <q-tag
          v-for="item in selected"
          :key="getValueKey(item)"
          :closable="!selectDisabled"
          @close="deleteTag($event, item)"
        >
          <span class="q-select__tags-text">{{ item.currentLabel }}</span>
        </q-tag>
      </transition-group>

      <input
        v-if="filterable"
        ref="input"
        v-model="query"
        type="text"
        class="q-select__input"
        :disabled="selectDisabled"
        :autocomplete="autocomplete"
        :style="nativeInputStyle"
        @focus="handleFocus"
        @keyup="managePlaceholder"
        @keydown="resetInputState"
        @keydown.down.prevent="navigateOptions('next')"
        @keydown.up.prevent="navigateOptions('prev')"
        @keydown.enter.prevent="selectOption"
        @keydown.esc.stop.prevent="visible = false"
        @keydown.delete="deletePrevTag"
        @keydown.tab="visible = false"
        @compositionstart="handleComposition"
        @compositionupdate="handleComposition"
        @compositionend="handleComposition"
        @input="debouncedQueryChange"
      />
    </div>
    <q-input
      ref="reference"
      v-model="selectedLabel"
      type="text"
      :placeholder="currentPlaceholder"
      :autocomplete="autocomplete"
      :disabled="selectDisabled"
      :readonly="readonly"
      :validate-event="false"
      :class="{ 'q-input_focus': visible }"
      :tabindex="multiple && filterable ? '-1' : null"
      @focus="handleFocus"
      @blur="handleBlur"
      @keyup.native="debouncedOnInputChange"
      @keydown.native.down.stop.prevent="navigateOptions('next')"
      @keydown.native.up.stop.prevent="navigateOptions('prev')"
      @keydown.native.enter.prevent="selectOption"
      @keydown.native.esc.stop.prevent="visible = false"
      @keydown.native.tab="visible = false"
      @paste.native="debouncedOnInputChange"
      @mouseenter.native="inputHovering = true"
      @mouseleave.native="inputHovering = false"
    >
      <template
        v-if="$slots.prefix"
        slot="prefix"
      >
        <slot name="prefix" />
      </template>
      <template slot="suffix">
        <span
          v-show="!showClose"
          :class="['q-select__caret', 'q-input__icon', 'q-icon-' + iconClass]"
        />
        <span
          v-if="showClose"
          class="q-select__caret q-input__icon q-icon-close"
          @click="handleClearClick"
        />
      </template>
    </q-input>
    <transition
      name="q-zoom-in-top"
      @before-enter="handleMenuEnter"
    >
      <q-select-dropdown
        v-if="visible"
        :append-to-body="popperAppendToBody"
      >
        <q-scrollbar
          v-show="isScrollbarShown"
          ref="scrollbar"
          tag="ul"
          wrap-class="q-select-dropdown__wrap"
          view-class="q-select-dropdown__list"
        >
          <q-option
            v-if="showNewOption"
            :value="query"
            created
          />
          <slot />
        </q-scrollbar>
        <template v-if="showEmptyContent">
          <slot
            v-if="$slots.empty"
            name="empty"
          />
          <p
            v-else
            class="q-select-dropdown__empty"
          >
            {{ emptyText }}
          </p>
        </template>
        <p
          v-else-if="isCanLoadMoreShown"
          class="q-select-dropdown__empty"
        >
          {{ loadMoreText }}
        </p>
      </q-select-dropdown>
    </transition>
  </div>
</template>

<script type="text/babel">
import { isObject, isEqual, debounce, get } from 'lodash-es';
import QSelectDropdown from './QSelectDropdown';
import QOption from './QOption';
import Focus from '../../mixins/focus';
import Emitter from '../../mixins/emitter';
import QTag from '../../QTag/src/QTag';
import QInput from '../../QInput/src/QInput';

export default {
  name: 'QSelect',
  components: {
    QInput,
    QSelectDropdown,
    QOption,
    QTag
  },
  mixins: [Emitter, Focus('reference')],
  componentName: 'QSelect',

  inject: {
    elForm: {
      default: ''
    },
    elFormItem: {
      default: ''
    },
    qForm: {
      default: ''
    },
    qFormItem: {
      default: ''
    }
  },

  provide() {
    return {
      select: this
    };
  },

  props: {
    value: {
      type: [String, Number, Array],
      required: true
    },
    autocomplete: {
      type: String,
      default: 'off'
    },
    canLoadMore: {
      type: Boolean,
      default: false
    },
    automaticDropdown: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    clearable: { type: Boolean, default: false },
    filterable: { type: Boolean, default: false },
    allowCreate: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    remote: { type: Boolean, default: false },
    loadingText: {
      type: String,
      default: 'Загрузка...'
    },
    loadMoreText: {
      type: String,
      default: 'Показаны не все результаты, уточните поиск'
    },
    noMatchText: {
      type: String,
      default: 'Нет совпадений'
    },
    noDataText: {
      type: String,
      default: 'Нет данных'
    },
    multiple: { type: Boolean, default: false },
    multipleLimit: {
      type: Number,
      default: 0
    },
    placeholder: {
      type: String,
      default: ''
    },
    defaultFirstOption: { type: Boolean, default: false },
    reserveKeyword: { type: Boolean, default: false },
    valueKey: {
      type: String,
      default: 'value'
    },
    collapseTags: { type: Boolean, default: false },
    popperAppendToBody: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      options: [],
      cachedOptions: [],
      createdLabel: null,
      createdSelected: false,
      selected: this.multiple ? [] : {},
      inputLength: 20,
      inputWidth: 0,
      initialInputHeight: 40,
      cachedPlaceHolder: '',
      optionsCount: 0,
      filteredOptionsCount: 0,
      visible: false,
      selectedLabel: '',
      hoverIndex: -1,
      query: '',
      previousQuery: null,
      inputHovering: false,
      currentPlaceholder: '',
      menuVisibleOnFocus: false,
      isOnComposition: false,
      isSilentBlur: false
    };
  },

  computed: {
    isCanLoadMoreShown() {
      return this.canLoadMore && !this.loading && this.filteredOptionsCount > 0;
    },

    isScrollbarShown() {
      return this.options.length > 0 && !this.loading;
    },

    tagsStyle() {
      return { 'max-width': `${this.inputWidth - 32}px`, width: '100%' };
    },

    showEmptyContent() {
      return (
        this.emptyText &&
        (!this.allowCreate ||
          this.loading ||
          (this.allowCreate && this.options.length === 0))
      );
    },

    nativeInputStyle() {
      return {
        'flex-grow': '1',
        width: `${this.inputLength / (this.inputWidth - 32)}%`,
        'max-width': `${this.inputWidth - 42}px`
      };
    },

    readonly() {
      return !this.filterable || this.multiple;
    },

    showClose() {
      const hasValue = this.multiple
        ? Array.isArray(this.value) && this.value.length > 0
        : ![undefined, null, ''].includes(this.value);
      const criteria =
        this.clearable &&
        !this.selectDisabled &&
        this.inputHovering &&
        hasValue;
      return criteria;
    },

    iconClass() {
      if (this.remote && this.filterable) return '';
      return this.visible
        ? 'triangle-up q-input__icon_reverse'
        : 'triangle-down';
    },

    emptyText() {
      if (this.loading) return this.loadingText;
      if (this.remote && this.query === '' && this.options.length === 0)
        return '';
      if (
        this.filterable &&
        this.query &&
        this.options.length > 0 &&
        this.filteredOptionsCount === 0
      ) {
        return this.noMatchText;
      }
      if (this.options.length === 0) {
        return this.noDataText;
      }

      return '';
    },

    showNewOption() {
      const hasExistingOption = this.options
        .filter(option => !option.created)
        .some(option => option.currentLabel === this.query);
      return (
        this.filterable &&
        this.allowCreate &&
        this.query !== '' &&
        !hasExistingOption
      );
    },

    selectDisabled() {
      return (
        this.disabled ||
        Boolean(this.elForm?.disabled) ||
        Boolean(this.qForm?.disabled)
      );
    }
  },

  watch: {
    selectDisabled() {
      this.$nextTick(() => {
        this.resetInputHeight();
      });
    },

    placeholder(val) {
      this.cachedPlaceHolder = val;
      this.currentPlaceholder = val;
    },

    value(val, oldVal) {
      if (this.multiple) {
        this.resetInputHeight();
        if (val?.length > 0 || (this.$refs.input && this.query !== '')) {
          this.currentPlaceholder = '';
        } else {
          this.currentPlaceholder = this.cachedPlaceHolder;
        }
        if (this.filterable && !this.reserveKeyword) {
          this.query = '';
          this.handleQueryChange(this.query);
        }
      }
      this.setSelected();
      if (this.filterable && !this.multiple) {
        this.inputLength = 20;
      }
      if (!isEqual(val, oldVal)) {
        this.dispatch('QFormItem', 'q.form.change', val);
        this.dispatch('ElFormItem', 'el.form.change', val);
      }
    },

    visible(val) {
      if (!val) {
        this.broadcast('QSelectDropdown', 'destroyPopper');
        this.$refs.input && this.$refs.input.blur();
        this.query = '';
        this.previousQuery = null;
        this.selectedLabel = '';
        this.inputLength = 20;
        this.menuVisibleOnFocus = false;
        this.resetHoverIndex();
        this.$nextTick(() => {
          if (this.$refs.input?.value === '' && this.selected.length === 0) {
            this.currentPlaceholder = this.cachedPlaceHolder;
          }
        });
        if (!this.multiple) {
          if (this.selected) {
            if (
              this.filterable &&
              this.allowCreate &&
              this.createdSelected &&
              this.createdLabel
            ) {
              this.selectedLabel = this.createdLabel;
            } else {
              this.selectedLabel = this.selected.currentLabel;
            }
            if (this.filterable) this.query = this.selectedLabel;
          }

          if (this.filterable) {
            this.currentPlaceholder = this.cachedPlaceHolder;
          }
        }
      } else {
        this.broadcast('QSelectDropdown', 'updatePopper');
        if (this.filterable) {
          this.query = this.remote ? '' : this.selectedLabel;
          this.handleQueryChange(this.query);
          if (this.multiple) {
            this.$refs.input.focus();
          } else {
            if (!this.remote) {
              this.broadcast('QOption', 'queryChange', '');
            }

            if (this.selectedLabel) {
              this.currentPlaceholder = this.selectedLabel;
              this.selectedLabel = '';
            }
          }
        }
      }
      this.$emit('visible-change', val);
    },

    options() {
      this.$nextTick(() => {
        this.broadcast('QSelectDropdown', 'updatePopper');
      });
      if (this.multiple) {
        this.resetInputHeight();
      }
      const inputs = this.$el.querySelectorAll('input');
      if ([].indexOf.call(inputs, document.activeElement) === -1) {
        this.setSelected();
      }
      if (
        this.defaultFirstOption &&
        (this.filterable || this.remote) &&
        this.filteredOptionsCount
      ) {
        this.checkDefaultFirstOption();
      }
    }
  },

  created() {
    this.cachedPlaceHolder = this.placeholder;
    this.currentPlaceholder = this.placeholder;
    if (this.multiple && !Array.isArray(this.value)) {
      this.$emit('input', []);
    }
    if (!this.multiple && Array.isArray(this.value)) {
      this.$emit('input', '');
    }

    this.debouncedOnInputChange = debounce(this.onInputChange);

    this.debouncedQueryChange = debounce(e => {
      this.handleQueryChange(e.target.value);
    });

    this.$on('handleOptionClick', this.handleOptionSelect);
    this.$on('setSelected', this.setSelected);
  },

  mounted() {
    if (this.multiple && Array.isArray(this.value) && this.value.length > 0) {
      this.currentPlaceholder = '';
    }

    const reference = this.$refs.reference;
    if (reference?.$el) {
      const input = reference.$el.querySelector('input');
      this.initialInputHeight =
        input.getBoundingClientRect().height || this.initialInputHeight;
    }
    if (this.remote && this.multiple) {
      this.resetInputHeight();
    }
    this.$nextTick(() => {
      if (reference?.$el) {
        this.inputWidth = reference.$el.getBoundingClientRect().width;
      }
    });
    this.setSelected();
  },

  methods: {
    handleComposition(event) {
      const text = event.target.value;
      this.isOnComposition = false;
      this.$nextTick(() => this.handleQueryChange(text));
    },
    handleQueryChange(val) {
      if (this.previousQuery === val || this.isOnComposition) return;
      if (this.previousQuery === null) {
        this.previousQuery = val;
        return;
      }
      this.previousQuery = val;
      this.hoverIndex = -1;
      if (this.multiple && this.filterable) {
        this.$nextTick(() => {
          this.managePlaceholder();
          this.resetInputHeight();
        });
      }
      if (this.remote) {
        this.hoverIndex = -1;
        this.$emit('remote-method', val);
      } else {
        this.$emit('filter-method', val);
        this.filteredOptionsCount = this.optionsCount;
        this.broadcast('QOption', 'queryChange', val);
      }
      if (
        this.defaultFirstOption &&
        (this.filterable || this.remote) &&
        this.filteredOptionsCount
      ) {
        this.checkDefaultFirstOption();
      }
    },

    scrollToOption() {
      this.$refs.scrollbar && this.$refs.scrollbar.handleScroll();
    },

    handleMenuEnter() {
      this.$nextTick(() => this.scrollToOption(this.selected));
    },

    emitChange(val) {
      if (!isEqual(this.value, val)) {
        this.$emit('change', val);
      }
    },

    getOption(value) {
      let option;
      const isVavueObject = isObject(value);
      for (let i = this.cachedOptions.length - 1; i >= 0; i -= 1) {
        const cachedOption = this.cachedOptions[i];
        const isValuesEqual = isVavueObject
          ? get(cachedOption.value, this.valueKey) === get(value, this.valueKey)
          : cachedOption.value === value;
        if (isValuesEqual) {
          option = cachedOption;
          break;
        }
      }
      if (option) return option;
      const label =
        !isVavueObject && ![null, undefined].includes(value) ? value : '';
      const newOption = {
        value,
        currentLabel: label
      };
      if (this.multiple) {
        newOption.hitState = false;
      }
      return newOption;
    },

    setSelected() {
      if (!this.multiple) {
        const option = this.getOption(this.value);
        if (option.created) {
          this.createdLabel = option.currentLabel;
          this.createdSelected = true;
        } else {
          this.createdSelected = false;
        }
        this.selectedLabel = option.currentLabel;
        this.selected = option;
        if (this.filterable) this.query = this.selectedLabel;
        return;
      }
      const result = [];
      if (Array.isArray(this.value)) {
        this.value.forEach(value => {
          result.push(this.getOption(value));
        });
      }
      this.selected = result;
      this.$nextTick(() => {
        this.resetInputHeight();
      });
    },

    handleFocus(event) {
      if (this.automaticDropdown || this.filterable) {
        this.visible = true;
        if (this.filterable) {
          this.menuVisibleOnFocus = true;
        }
      }
      this.$emit('focus', event);
    },

    blur() {
      this.visible = false;
      this.$refs.reference.blur();
    },

    handleBlur(event) {
      setTimeout(() => {
        if (this.isSilentBlur) {
          this.isSilentBlur = false;
        } else {
          this.$emit('blur', event);
        }
      }, 50);
    },

    handleClearClick(event) {
      event.stopPropagation();
      const value = this.multiple ? [] : '';
      this.$emit('input', value);
      this.emitChange(value);
      this.visible = false;
      this.$emit('clear');
    },

    handleClose() {
      this.visible = false;
    },

    toggleLastOptionHitState(hit) {
      if (!Array.isArray(this.selected)) return;
      const option = this.selected[this.selected.length - 1];
      if (!option) return;

      option.hitState = hit ?? !option.hitState;
    },

    deletePrevTag(e) {
      if (e.target.value.length <= 0 && !this.toggleLastOptionHitState()) {
        const value = [...this.value];
        value.pop();
        this.$emit('input', value);
        this.emitChange(value);
      }
    },

    managePlaceholder() {
      if (this.currentPlaceholder !== '') {
        this.currentPlaceholder = this.$refs.input.value
          ? ''
          : this.cachedPlaceHolder;
      }
    },

    resetInputState(e) {
      if (e.keyCode !== 8) this.toggleLastOptionHitState(false);
      this.resetInputHeight();
    },

    resetInputHeight() {
      if (this.collapseTags && !this.filterable) return;
      this.$nextTick(() => {
        if (!this.$refs.reference) return;
        const inputChildNodes = this.$refs.reference.$el.childNodes;
        const input = [].filter.call(
          inputChildNodes,
          item => item.tagName === 'INPUT'
        )[0];
        const tags = this.$refs.tags;
        input.style.height =
          this.selected.length === 0
            ? `${this.initialInputHeight}px`
            : `${Math.max(
                tags
                  ? tags.clientHeight +
                      (tags.clientHeight > this.initialInputHeight ? 6 : 0)
                  : 0,
                this.initialInputHeight
              )}px`;
      });
    },

    resetHoverIndex() {
      setTimeout(() => {
        if (!this.multiple) {
          this.hoverIndex = this.options.indexOf(this.selected);
        } else if (this.selected.length > 0) {
          this.hoverIndex = Math.min.apply(
            null,
            this.selected.map(item => this.options.indexOf(item))
          );
        } else {
          this.hoverIndex = -1;
        }
      }, 300);
    },

    handleOptionSelect(option, byClick) {
      if (this.multiple) {
        const value = [...(this.value ?? [])];
        const optionIndex = this.getValueIndex(value, option.value);
        if (optionIndex > -1) {
          value.splice(optionIndex, 1);
        } else if (
          this.multipleLimit <= 0 ||
          value.length < this.multipleLimit
        ) {
          value.push(option.value);
        }
        this.$emit('input', value);
        this.emitChange(value);
        if (option.created) {
          this.query = '';
          this.handleQueryChange('');
          this.inputLength = 20;
        }
        if (this.filterable) this.$refs.input.focus();
      } else {
        this.$emit('input', option.value);
        this.emitChange(option.value);
        this.visible = false;
      }
      this.isSilentBlur = byClick;
      if (this.visible) return;
      this.$nextTick(() => {
        this.scrollToOption(option);
      });
    },

    getValueIndex(arr = [], value) {
      const isValueObject = isObject(value);
      if (!isValueObject) return arr.indexOf(value);

      const valueKey = this.valueKey;
      let index = -1;
      arr.some((item, i) => {
        if (get(item, valueKey) === get(value, valueKey)) {
          index = i;
          return true;
        }
        return false;
      });
      return index;
    },

    toggleMenu() {
      if (!this.selectDisabled) {
        if (this.menuVisibleOnFocus) {
          this.menuVisibleOnFocus = false;
        } else {
          this.visible = !this.visible;
        }
        if (this.visible) {
          (this.$refs.input || this.$refs.reference).focus();
        }
      }
    },

    selectOption() {
      if (!this.visible) {
        this.toggleMenu();
      } else if (this.options[this.hoverIndex]) {
        this.handleOptionSelect(this.options[this.hoverIndex]);
      }
    },

    deleteTag(event, tag) {
      event.stopPropagation();
      const index = this.selected.indexOf(tag);
      if (index > -1 && !this.selectDisabled) {
        const value = [...this.value];
        value.splice(index, 1);
        this.$emit('input', value);
        this.emitChange(value);
        this.$emit('remove-tag', tag.value);
      }
    },

    onInputChange() {
      if (this.filterable && this.query !== this.selectedLabel) {
        this.query = this.selectedLabel;
        this.handleQueryChange(this.query);
      }
    },

    onOptionDestroy(index) {
      if (index > -1) {
        this.optionsCount -= 1;
        this.filteredOptionsCount -= 1;
        this.options.splice(index, 1);
      }
    },

    resetInputWidth() {
      this.inputWidth = this.$refs.reference.$el.getBoundingClientRect().width;
    },

    handleResize() {
      this.resetInputWidth();
      if (this.multiple) this.resetInputHeight();
    },

    checkDefaultFirstOption() {
      this.hoverIndex = -1;
      // highlight the created option
      let hasCreated = false;
      for (let i = this.options.length - 1; i >= 0; i -= 1) {
        if (this.options[i].created) {
          hasCreated = true;
          this.hoverIndex = i;
          break;
        }
      }
      if (hasCreated) return;
      /* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
      for (let i = 0; i !== this.options.length; ++i) {
        const option = this.options[i];
        if (this.query) {
          // highlight first options that passes the filter
          if (!option.disabled && !option.groupDisabled && option.visible) {
            this.hoverIndex = i;
            break;
          }
        } else if (option.itemSelected) {
          this.hoverIndex = i;
          break;
        }
      }
    },

    getValueKey(item) {
      if (
        Object.prototype.toString.call(item.value).toLowerCase() !==
        '[object object]'
      ) {
        return item.value;
      }
      return get(item.value, this.valueKey);
    }
  }
};
</script>
