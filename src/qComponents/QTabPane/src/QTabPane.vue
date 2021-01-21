<template>
  <div
    class="q-tab-pane"
    :style="tabWidthStyle"
  >
    <div class="q-tab-pane__inner">
      <button
        type="button"
        class="q-tab-pane__btn"
        :class="tabBtnClasses"
        :disabled="isDisabled"
        @click="handleTabClick"
      >
        {{ title }}
      </button>

      <slot name="content" />
    </div>
    <div
      v-if="description"
      class="q-tab-pane__description"
    >
      {{ description }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'QTabPane',
  componentName: 'QTabPane',

  inject: {
    qTabs: {
      default: null
    }
  },

  props: {
    /**
     * key of QTabPane
     */
    name: {
      type: String,
      required: true
    },
    /**
     * title of QTabPane
     */
    title: {
      type: String,
      required: true
    },
    /**
     * description of QTabPane
     */
    description: {
      type: String,
      default: null
    },
    /**
     * width of QTabPane
     */
    width: {
      type: [String, Number],
      default: null
    },
    /**
     * whether QTabPane is disabled
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    isDisabled() {
      return this.disabled || this.qTabs?.disabled;
    },

    tabWidthStyle() {
      const width = this.width ?? this.qTabs?.tabWidth;

      return {
        '--tab-pane-width': Number(width) ? `${Number(width)}px` : width
      };
    },

    tabBtnClasses() {
      return {
        'q-tab-pane__btn_active': this.qTabs?.currentName === this.name,
        'q-tab-pane__btn_disabled': this.isDisabled
      };
    }
  },

  methods: {
    handleTabClick() {
      this.qTabs?.updateValue(this.name);
    }
  }
};
</script>
