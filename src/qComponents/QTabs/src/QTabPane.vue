<template>
  <div class="q-tab-pane">
    <div class="q-tab-pane__inner">
      <button
        type="button"
        class="q-tab-pane__btn"
        :class="getTabBtnClasses"
        :style="tabWidthStyle"
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
      :style="tabWidthStyle"
    >
      {{ description }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'QTabPane',
  componentName: 'QTabPane',

  props: {
    /**
     * name of pane
     */
    name: {
      type: String,
      required: true
    },
    /**
     * title of pane
     */
    title: {
      type: String,
      required: true
    },
    /**
     * whether pane is disabled
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * description of pane
     */
    description: {
      type: String,
      default: ''
    },
    /**
     * width of Tab pane
     */
    width: {
      type: [String, Number],
      default: ''
    }
  },

  computed: {
    isDisabled() {
      return this.disabled || this.$parent.disabled;
    },

    tabWidthStyle() {
      const sourceWidthValue = this.width || this.$parent.tabWidth;

      return {
        width: Number(sourceWidthValue)
          ? `${Number(sourceWidthValue)}px`
          : sourceWidthValue
      };
    },

    getTabBtnClasses() {
      return {
        'q-tab-pane__btn_active': this.$parent.currentName === this.name,
        'q-tab-pane__btn_disabled': this.isDisabled
      };
    }
  },

  created() {
    // eslint-disable-next-line no-underscore-dangle
    const parentComponentName = this.$parent.$options._componentTag;

    if (
      parentComponentName !== 'q-tabs' &&
      process.env.NODE_ENV !== 'production'
    ) {
      console.error('QTabPane: component parent must be q-tabs');
    }
  },

  methods: {
    handleTabClick() {
      this.$parent.updateValue(this.name);
    }
  }
};
</script>
