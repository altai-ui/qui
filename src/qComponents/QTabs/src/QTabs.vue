<template>
  <div class="q-tabs">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'QTabs',
  componentName: 'QTabs',

  model: {
    prop: 'value',
    event: 'change'
  },

  provide() {
    return {
      qTabs: this
    };
  },

  props: {
    /**
     * width of QTabPanes
     */
    tabWidth: {
      type: [String, Number],
      default: null
    },
    value: {
      type: String,
      default: null
    },
    /**
     * whether QTabs is disabled
     */
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      currentName: ''
    };
  },

  watch: {
    value: {
      immediate: true,
      handler(name) {
        this.updateValue(name);
      }
    }
  },

  methods: {
    updateValue(name) {
      /**
       * triggers when the tab changes
       */
      this.$emit('change', name);
      this.currentName = name;
    }
  }
};
</script>
