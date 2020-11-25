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

  props: {
    /**
     * width of Tab panes
     */
    tabWidth: {
      type: [String, Number],
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    /**
     * whether Tab is disabled
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
