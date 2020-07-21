<template>
  <div class="q-collapse">
    <slot />
  </div>
</template>

<script>
import { uniqueId } from 'lodash-es';

export default {
  name: 'QCollapse',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
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
      handler(value) {
        this.activeNames = [].concat(value);
      },
      immediate: true
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
