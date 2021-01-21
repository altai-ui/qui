<template>
  <div class="q-collapse">
    <slot />
  </div>
</template>

<script>
import { uniqueId } from 'lodash-es';

export default {
  name: 'QCollapse',
  componentName: 'QCollapse',

  provide() {
    return {
      qCollapse: this
    };
  },

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    /**
     * shrink all panels, except the last selected
     */
    accordion: {
      type: Boolean,
      default: false
    },
    value: {
      type: [Array, String, Number],
      default: () => []
    }
  },

  data() {
    return {
      activeNames: [],
      uniqueId
    };
  },

  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.activeNames = [].concat(value);
      }
    }
  },

  methods: {
    updateValue(name) {
      if (this.accordion) {
        this.activeNames = this.activeNames === name ? [] : [name];
      } else {
        const index = this.activeNames.indexOf(name);

        if (index > -1) {
          this.activeNames.splice(index, 1);
        } else {
          this.activeNames.push(name);
        }
      }

      this.$emit('change', this.activeNames);
    }
  }
};
</script>
