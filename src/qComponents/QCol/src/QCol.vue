<template>
  <component
    :is="tag"
    class="q-col"
    :class="classes"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'QCol',
  componentName: 'QCol',

  props: {
    /**
     * custom element tag
     */
    tag: {
      type: String,
      default: 'div'
    },
    /**
     * number of column the grid cols.
     * `auto || [1-12]`
     */
    cols: {
      type: [String, Number],
      default: null,
      validator: value => value === 'auto' || (value > 0 && value <= 12)
    },
    /**
     * number of spacing on the left side of the grid.
     * `[0-11]`
     */
    offset: {
      type: [String, Number],
      default: null,
      validator: value => value >= 0 && value <= 11
    }
  },

  computed: {
    classes() {
      return {
        [`q-col_size_${this.cols}`]: Boolean(this.cols),
        [`q-col_offset_${this.offset}`]: Number.isInteger(
          Number(this.offset ?? 'hide')
        )
      };
    }
  }
};
</script>
